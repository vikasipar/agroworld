import React from "react";

function ProductDetails({ currentProduct }: any) {
  return (
    <div>
      <h3 className="mx-20 font-semibold text-2xl">About this item:</h3>
      <table className="my-8 w-fit mx-auto mb-12 text-lg" border={1}>
        <tbody>
          <tr>
            <td>Condition:</td>
            <td>{currentProduct.Condition}</td>
          </tr>
          {currentProduct.Specifications.Power && (
            <tr>
              <td>Power:</td>
              <td>{currentProduct.Specifications.Power}</td>
            </tr>
          )}
          {currentProduct.Specifications.FuelType && (
            <tr>
              <td>Fuel Type:</td>
              <td>{currentProduct.Specifications?.FuelType}</td>
            </tr>
          )}
          <tr>
            <td>Accessories:</td>
            <td>{currentProduct.Accessories}</td>
          </tr>
          <tr>
            <td>Rental Terms:</td>
            <td>{currentProduct.RentalTerms}</td>
          </tr>
          <tr>
            <td>Delivery Options:</td>
            <td>{currentProduct.DeliveryOptions}</td>
          </tr>
          <tr>
            <td>Service:</td>
            <td>{currentProduct.Service}</td>
          </tr>
          <tr>
            <td>Usage Instructions:</td>
            <td>{currentProduct.UsageInstructions}</td>
          </tr>
          <tr>
            <td>Contact:</td>
            <td>{currentProduct.ContactInformation}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ProductDetails;
