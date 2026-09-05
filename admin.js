// Admin Panel Script with Authentication and Edit Functionality
// Handles product management, image resizing, authentication, and localStorage persistence

// Configuration
const CONFIG = {
  IMAGE_WIDTH: 400,
  IMAGE_HEIGHT: 300,
  QUALITY: 0.85,
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  DEFAULT_PASSWORD: 'tjv2024',
  PASSWORD_KEY: 'tjv-admin-password',
  SESSION_KEY: 'tjv-admin-session',
  SESSION_DURATION: 2 * 60 * 60 * 1000 // 2 hours in milliseconds
};

// Global state
let isEditMode = false;
let editingProductId = null;

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

function init() {
  initializePassword();
  checkAuthentication();
  setupEventListeners();
}

// Initialize default password if not set
function initializePassword() {
  const storedPassword = localStorage.getItem(CONFIG.PASSWORD_KEY);
  if (!storedPassword) {
    localStorage.setItem(CONFIG.PASSWORD_KEY, CONFIG.DEFAULT_PASSWORD);
  }
}

// Check if user is authenticated
function checkAuthentication() {
  const session = localStorage.getItem(CONFIG.SESSION_KEY);
  if (session) {
    const sessionData = JSON.parse(session);
    const now = Date.now();
    
    if (sessionData.expires > now) {
      // Valid session - show admin content
      showAdminContent();
      return;
    } else {
      // Expired session
      localStorage.removeItem(CONFIG.SESSION_KEY);
    }
  }
  
  // Not authenticated - show login modal
  showLoginModal();
}

// Show login modal
function showLoginModal() {
  document.getElementById('login-modal').style.display = 'flex';
  document.getElementById('admin-content').style.display = 'none';
  document.getElementById('admin-password').focus();
}

// Show admin content
function showAdminContent() {
  document.getElementById('login-modal').style.display = 'none';
  document.getElementById('admin-content').style.display = 'block';
  loadExistingItems();
  setupImagePreview();
}

// Setup event listeners
function setupEventListeners() {
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }
  
  const passwordForm = document.getElementById('password-form');
  if (passwordForm) {
    passwordForm.addEventListener('submit', handlePasswordChange);
  }
}

// Handle login
function handleLogin(event) {
  event.preventDefault();
  
  const passwordInput = document.getElementById('admin-password');
  const enteredPassword = passwordInput.value;
  const storedPassword = localStorage.getItem(CONFIG.PASSWORD_KEY);
  const errorDiv = document.getElementById('login-error');
  
  if (enteredPassword === storedPassword) {
    // Correct password - create session
    const sessionData = {
      authenticated: true,
      expires: Date.now() + CONFIG.SESSION_DURATION
    };
    localStorage.setItem(CONFIG.SESSION_KEY, JSON.stringify(sessionData));
    
    // Clear form and show admin content
    passwordInput.value = '';
    errorDiv.style.display = 'none';
    showAdminContent();
  } else {
    // Wrong password
    errorDiv.textContent = 'Incorrect password. Please try again.';
    errorDiv.style.display = 'block';
    passwordInput.value = '';
    passwordInput.focus();
  }
}

// Handle password change
function handlePasswordChange(event) {
  event.preventDefault();
  
  const currentPasswordInput = document.getElementById('current-password');
  const newPasswordInput = document.getElementById('new-password');
  const currentPassword = currentPasswordInput.value;
  const newPassword = newPasswordInput.value;
  const storedPassword = localStorage.getItem(CONFIG.PASSWORD_KEY);
  
  if (currentPassword !== storedPassword) {
    showMessage('Current password is incorrect.', 'error');
    return;
  }
  
  if (newPassword.length < 6) {
    showMessage('New password must be at least 6 characters long.', 'error');
    return;
  }
  
  localStorage.setItem(CONFIG.PASSWORD_KEY, newPassword);
  currentPasswordInput.value = '';
  newPasswordInput.value = '';
  showMessage('Password changed successfully!', 'success');
}

// Logout function
function logout() {
  localStorage.removeItem(CONFIG.SESSION_KEY);
  showLoginModal();
}

// Setup image preview when file is selected
function setupImagePreview() {
  const fileInput = document.getElementById('product-image');
  const preview = document.getElementById('preview');

  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        // Validate file
        if (file.size > CONFIG.MAX_FILE_SIZE) {
          showMessage('File size too large. Maximum is 5MB.', 'error');
          fileInput.value = '';
          if (!isEditMode) {
            preview.innerHTML = 'No image selected';
            preview.classList.add('empty');
          }
          return;
        }

        // Create preview
        const reader = new FileReader();
        reader.onload = (event) => {
          preview.innerHTML = `<img src="${event.target.result}" alt="Preview" />`;
          preview.classList.remove('empty');
        };
        reader.readAsDataURL(file);
      }
    });
  }
}

// Resize image to fit frame
function resizeImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = CONFIG.IMAGE_WIDTH;
        canvas.height = CONFIG.IMAGE_HEIGHT;
        const ctx = canvas.getContext('2d');

        // Calculate dimensions to cover the canvas
        const scale = Math.max(
          CONFIG.IMAGE_WIDTH / img.width,
          CONFIG.IMAGE_HEIGHT / img.height
        );
        const x = (CONFIG.IMAGE_WIDTH - img.width * scale) / 2;
        const y = (CONFIG.IMAGE_HEIGHT - img.height * scale) / 2;

        ctx.fillStyle = '#1a2a4a';
        ctx.fillRect(0, 0, CONFIG.IMAGE_WIDTH, CONFIG.IMAGE_HEIGHT);
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

        canvas.toBlob(
          (blob) => {
            const resizedFile = new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now()
            });
            resolve(resizedFile);
          },
          'image/jpeg',
          CONFIG.QUALITY
        );
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = event.target.result;
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

// Convert file to base64 for storage
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Failed to convert file'));
    reader.readAsDataURL(file);
  });
}

// Handle form submission (add or edit)
async function handleProductSubmit(event) {
  event.preventDefault();

  const nameInput = document.getElementById('product-name');
  const categoryInput = document.getElementById('product-category');
  const priceInput = document.getElementById('product-price');
  const promoInput = document.getElementById('product-promo');
  const imageInput = document.getElementById('product-image');
  const productIdInput = document.getElementById('edit-product-id');

  // Validate inputs
  if (!nameInput.value || !categoryInput.value || !priceInput.value) {
    showMessage('Please fill in all required fields.', 'error');
    return;
  }

  // Check for image - required for new items, optional for edits
  if (!isEditMode && !imageInput.files[0]) {
    showMessage('Please select an image for new products.', 'error');
    return;
  }

  try {
    // Show processing message
    showMessage('Processing...', 'info');

    let imageBase64 = null;
    
    // Process image if provided
    if (imageInput.files[0]) {
      // Resize the image
      const resizedFile = await resizeImage(imageInput.files[0]);
      // Convert to base64
      imageBase64 = await fileToBase64(resizedFile);
    }

    // Get existing items
    const items = JSON.parse(localStorage.getItem('tjv-instock-items')) || [];

    if (isEditMode && editingProductId) {
      // Edit existing product
      const productIndex = items.findIndex(item => item.id === editingProductId);
      if (productIndex >= 0) {
        items[productIndex] = {
          ...items[productIndex],
          name: nameInput.value.trim(),
          category: categoryInput.value,
          price: priceInput.value,
          promo: promoInput.value.trim(),
          // Keep existing image if no new image provided
          ...(imageBase64 && { image: imageBase64 })
        };
        showMessage(`"${nameInput.value.trim()}" updated successfully!`, 'success');
      }
    } else {
      // Add new product
      const product = {
        id: Date.now(),
        name: nameInput.value.trim(),
        category: categoryInput.value,
        price: priceInput.value,
        promo: promoInput.value.trim(),
        image: imageBase64
      };
      items.push(product);
      showMessage(`"${product.name}" added to stock successfully!`, 'success');
    }

    // Save to localStorage
    localStorage.setItem('tjv-instock-items', JSON.stringify(items));

    // Reset form and exit edit mode
    cancelEdit();

    // Reload items display
    loadExistingItems();

    // Reload items on main page if open
    if (window.opener && window.opener.loadInStockItems) {
      window.opener.loadInStockItems();
      // Also refresh the slideshow to show new products
      if (window.opener.refreshSlideshow) {
        window.opener.refreshSlideshow();
      }
    }
  } catch (error) {
    showMessage(`Error: ${error.message}`, 'error');
    console.error('Error processing product:', error);
  }
}

// Load and display existing items
function loadExistingItems() {
  const container = document.getElementById('items-container');
  const emptyState = document.getElementById('empty-state');
  const items = JSON.parse(localStorage.getItem('tjv-instock-items')) || [];

  if (!container) return;

  if (items.length === 0) {
    container.style.display = 'none';
    emptyState.style.display = 'block';
    return;
  }

  container.style.display = 'grid';
  emptyState.style.display = 'none';
  container.innerHTML = '';

  items.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'item-card';
    card.innerHTML = `
      <div class="item-card-image">
        <img src="${item.image}" alt="${item.name}" />
      </div>
      <div class="item-card-content">
        <h3 class="item-card-name">${escapeHtml(item.name)}</h3>
        <p class="item-card-category">${escapeHtml(item.category)}</p>
        <p class="item-card-price">UGX ${parseInt(item.price).toLocaleString()} per unit</p>
        ${item.promo ? `<p class="item-card-promo">🏷 ${escapeHtml(item.promo)}</p>` : ''}
        <div class="item-card-actions">
          <button class="btn-edit" onclick="editItem(${item.id})">Edit</button>
          <button class="btn-delete" onclick="deleteItem(${item.id})">Delete</button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// Edit an item
function editItem(id) {
  const items = JSON.parse(localStorage.getItem('tjv-instock-items')) || [];
  const item = items.find(product => product.id === id);
  
  if (!item) {
    showMessage('Product not found.', 'error');
    return;
  }

  // Set edit mode
  isEditMode = true;
  editingProductId = id;

  // Update form
  document.getElementById('form-title').textContent = 'Edit Product';
  document.getElementById('submit-btn').textContent = 'Update Product';
  document.getElementById('edit-product-id').value = id;
  
  // Populate form fields
  document.getElementById('product-name').value = item.name;
  document.getElementById('product-category').value = item.category;
  document.getElementById('product-price').value = item.price;
  document.getElementById('product-promo').value = item.promo || '';

  // Show current image in preview
  const preview = document.getElementById('preview');
  preview.innerHTML = `<img src="${item.image}" alt="${item.name}" />`;
  preview.classList.remove('empty');

  // Add editing class to form for styling
  document.getElementById('product-form').classList.add('editing');

  // Scroll to form
  document.getElementById('product-form').scrollIntoView({ behavior: 'smooth' });

  showMessage(`Editing "${item.name}". Leave image field empty to keep current image.`, 'info');
}

// Cancel edit and reset form
function cancelEdit() {
  isEditMode = false;
  editingProductId = null;

  // Reset form
  document.getElementById('form-title').textContent = 'Add Product to Stock';
  document.getElementById('submit-btn').textContent = 'Add to Stock';
  document.getElementById('edit-product-id').value = '';
  document.getElementById('product-form').classList.remove('editing');

  // Clear form fields
  document.getElementById('product-form').reset();
  
  // Reset preview
  const preview = document.getElementById('preview');
  preview.innerHTML = 'No image selected';
  preview.classList.add('empty');
}

// Delete an item
function deleteItem(id) {
  const items = JSON.parse(localStorage.getItem('tjv-instock-items')) || [];
  const item = items.find(product => product.id === id);
  
  if (!item) {
    showMessage('Product not found.', 'error');
    return;
  }

  if (!confirm(`Are you sure you want to delete "${item.name}"?`)) {
    return;
  }

  const updatedItems = items.filter(product => product.id !== id);

  localStorage.setItem('tjv-instock-items', JSON.stringify(updatedItems));
  showMessage(`"${item.name}" deleted successfully.`, 'success');
  loadExistingItems();

  // Reload items on main page if open
  if (window.opener) {
    window.opener.loadInStockItems?.();
  }
}

// Show message
function showMessage(text, type = 'info') {
  const container = document.getElementById('message-container');
  if (!container) return;

  const message = document.createElement('div');
  message.className = `message ${type}`;
  message.textContent = text;

  container.innerHTML = '';
  container.appendChild(message);

  // Auto-remove success messages after 4 seconds
  if (type === 'success') {
    setTimeout(() => {
      message.remove();
    }, 4000);
  }
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
