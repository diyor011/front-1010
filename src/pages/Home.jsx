import{ useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa6';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const requestProductData = async () => {
    try {
      const response = await fetch(
       import.meta.env.VITE_APP_BACKEND_URL + "products"
      );
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const showStars = (rating) => {
    return Array.from({ length: rating }, (_, index) => (
      <FaStar key={index} />
    ));
  };

  useEffect(() => {
    requestProductData();
  }, []);

  return (
    <div>
      {loading ? (
        <div>
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div className="max-w-[95%] mx-auto container">
          <p className="text-4xl font-bold my-5 text-primary">Projects</p>
          <div className="flex flex-wrap gap-5">
            {products.length > 0 ? (
              products.map((product, id) => (
                <div
                  key={id}
                  className="min-w-64 flex-1 min-h-96 shadow-md border border-opacity-35 border-primary rounded-lg relative"
                >
                  <figure className="outline-none border-none">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-full h-44 outline-none border-none"
                    />
                  </figure>
                  <div className="p-2 flex flex-col h-1/2 justify-between">
                    <h2 className="text-error text-lg font-bold">
                      {product.title}
                    </h2>
                    <p className="text-sm">{product.description}</p>
                    <p className="flex items-center justify-between">
                      <span className="font-bold">Rating:</span>
                      <span className="flex items-center gap-1 text-warning">
                        {showStars(product.rating)}
                      </span>
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <p className="badge badge-outline badge-error">
                        ${product.price}
                      </p>
                      <button className="btn btn-sm btn-primary">Buy now</button>
                    </div>
                  </div>
                  <div className="badge badge-sm badge-error font-bold -top-2 -right-5 absolute">
                    {product.availabilityStatus}
                  </div>
                </div>
              ))
            ) : (
              <div>No Projects</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;