import React from "react";

const ShopButtons = () => {
  const handleClick = (action) => {
    alert(`${action} button clicked!`);
  };

  const buttonStyle = {
    padding: "12px 25px",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    fontSize: "16px",
    cursor: "pointer",
    margin: "5px",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  };

  const addToCartStyle = {
    ...buttonStyle,
    backgroundColor: "#ff6f61",
    color: "white",
  };

  const buyNowStyle = {
    ...buttonStyle,
    backgroundColor: "#4caf50",
    color: "white",
  };

  const wishlistStyle = {
    ...buttonStyle,
    backgroundColor: "#ffca28",
    color: "#333",
  };

  const hoverStyle = {
    transform: "translateY(-2px)",
    boxShadow: "0 6px 10px rgba(0,0,0,0.15)",
  };

  return (
    <div>
      <button
        style={addToCartStyle}
        onMouseEnter={(e) => Object.assign(e.target.style, hoverStyle)}
        onMouseLeave={(e) =>
          Object.assign(e.target.style, { transform: "translateY(0)", boxShadow: buttonStyle.boxShadow })
        }
        onClick={() => handleClick("Add to Cart")}
      >
        Add to Cart
      </button>

      <button
        style={buyNowStyle}
        onMouseEnter={(e) => Object.assign(e.target.style, hoverStyle)}
        onMouseLeave={(e) =>
          Object.assign(e.target.style, { transform: "translateY(0)", boxShadow: buttonStyle.boxShadow })
        }
        onClick={() => handleClick("Buy Now")}
      >
        Buy Now
      </button>

      <button
        style={wishlistStyle}
        onMouseEnter={(e) => Object.assign(e.target.style, hoverStyle)}
        onMouseLeave={(e) =>
          Object.assign(e.target.style, { transform: "translateY(0)", boxShadow: buttonStyle.boxShadow })
        }
        onClick={() => handleClick("Wishlist")}
      >
        Wishlist
      </button>
    </div>
  );
};

export default ShopButtons;
