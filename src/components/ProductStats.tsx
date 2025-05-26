import type { Product } from "../types";

export default function ProductStats({ products }: { products: Product[] }) {
  const categories = Array.from(
    new Set(products.map((product) => product.category))
  );

  const stats = categories.map((category) => {
    const categoryProducts = products.filter(
      (product) => product.category === category
    );
    const totalValue = categoryProducts.reduce(
      (acc, product) => acc + product.price * product.stock,
      0
    );
    const averagePrice =
      totalValue /
      categoryProducts.reduce((acc, product) => acc + product.stock, 0);

    return {
      category,
      totalValue,
      averagePrice,
    };
  });

  return (
    <div>
      <h2>Product Statistics</h2>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Total Value</th>
            <th>Average Price</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((stat) => (
            <tr key={stat.category}>
              <td>{stat.category}</td>
              <td>{stat.totalValue.toFixed(2)}</td>
              <td>{stat.averagePrice.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
