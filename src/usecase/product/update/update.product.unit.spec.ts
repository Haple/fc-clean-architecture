import Product from "../../../domain/product/entity/product";
import UpdateProductUseCase from "./update.product.usecase";

const product = new Product(
  "123", "Product A", 19.99
);

const input = {
  id: product.id,
  name: "Product Updated",
  price: 33.56
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    update: jest.fn(),
  };
};

describe("Unit test for product update use case", () => {
  it("should update a product", async () => {
    const repository = MockRepository();
    const usecase = new UpdateProductUseCase(repository);

    const output = await usecase.execute(input);

    expect(output).toEqual(input);
  });
});
