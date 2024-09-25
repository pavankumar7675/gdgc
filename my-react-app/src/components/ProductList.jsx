import React from "react";
import "./ProductList.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons'; 

const ProductList = ({ products, addToCart }) => {
  return (
    <div className="container mt-4 text-center">
      <h2 className="text-center mb-4">Products</h2>
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-3 mb-4"> 
            <div className="card custom-card d-flex flex-column"> {/* Use flex-column */}
              <div className="product-image-container flex-grow-1"> {/* Allow image container to grow */}
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="card-img-top product-image" 
                />
              </div>
              <div className="card-body d-flex flex-column"> {/* Use flex-column for card body */}
                <h3 className="card-title">{product.title}</h3>
                <p className="card-text">Price: ${product.price}</p>
                
                {/* Rating section */}
                <div className="rating">
                  {Array.from({ length: 5 }, (_, index) => (
                    <FontAwesomeIcon 
                      key={index} 
                      icon={faStar} 
                      className={index < Math.round(product.rating.rate) ? 'star-filled' : 'star-empty'} 
                    />
                  ))}
                </div>

                <button 
                  className="btn btn-primary btn-sm mt-auto" // Add mt-auto to push the button down
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
