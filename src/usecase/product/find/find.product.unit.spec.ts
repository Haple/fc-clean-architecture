import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";

const product = new Product(
  "123", "Product A", 19.99
)

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit Test find product use case", () => {
  it("should find a product", async () => {
    const repository = MockRepository();
    const usecase = new FindProductUseCase(repository);

    const result = await usecase.execute({
      id: "123",
    });

    expect(result).toEqual({
      id: product.id,
      name: product.name,
      price: product.price
    });
  });

  it("should not find a product", async () => {
    const repository = MockRepository();
    repository.find.mockImplementation(() => {
      throw new Error("Product not found");
    });
    const usecase = new FindProductUseCase(repository);

    const input = {
      id: "123",
    };

    expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow("Product not found");
  });
});
