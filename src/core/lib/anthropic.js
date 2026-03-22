export const callClaude = async (base64Image, prompt) => {
  try {
    const response = await fetch('/api/classify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ image: base64Image, prompt: prompt })
    });
    
    return await response.json();
  } catch (error) {
    throw error;
  }
};
