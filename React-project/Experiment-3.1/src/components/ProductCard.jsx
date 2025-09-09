function ProductCard() {
  const products = [
    { name: "Wireless Mouse", price: 25.99, inStock: true },
    { name: "Keyboard", price: 45.5, inStock: false },
    { name: "Monitor", price: 199.99, inStock: true },
  ];
  return (
    <div id="product-list" style={{ border: "1px solid black", padding: "20px", width: "fit-content" }}>
      <h3 style={{ textAlign: "center" }}>Products List</h3>
      <div style={{ display: "flex", gap: "20px" }}>
        {products.map((product, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "15px",
              width: "150px",
              textAlign: "center",
            }}
          >
            <strong>{product.name}</strong>
            <p>Price: ${product.price}</p>
            <p>Status: {product.inStock ? "In Stock" : "Out of Stock"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default ProductCard;