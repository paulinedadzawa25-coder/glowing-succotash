async function uploadImages() {
  try {
    const response = await fetch('/api/upload-images', {
      method: 'POST',
    });
    
    const data = await response.json();
    
    if (data.success) {
      console.log('Images uploaded successfully!');
    } else {
      console.error('Failed to upload images:', data.message);
    }
  } catch (error) {
    console.error('Error during upload:', error);
  }
}

// Call the function
uploadImages();