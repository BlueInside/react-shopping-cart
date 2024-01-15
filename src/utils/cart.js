function addToCard(product, qty = 1) {
  // Create shallow copy of product object
  const newProduct = { ...product, quantity: qty };

  // Gets cart Array from session storage
  const sessionStorageCart = JSON.parse(sessionStorage.getItem('cart'));
  if (sessionStorageCart) {
    // Checks if item already is in cart
    const existingProduct = sessionStorageCart.find(
      (p) => p.id === newProduct.id
    );
    if (existingProduct) {
      // If item is in array just increase its quantity by one
      existingProduct.quantity += qty;
    } else {
      // Otherwise add item to cart Array
      sessionStorageCart.push(newProduct);
    }

    // If theres cart save in session storage update cart
    sessionStorage.setItem('cart', JSON.stringify(sessionStorageCart));
  } else {
    // Create new cart array in session storage
    sessionStorage.setItem('cart', JSON.stringify([newProduct]));
  }
}

export { addToCard };
