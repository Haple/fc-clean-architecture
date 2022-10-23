import CreateProductUseCase from "./create.product.usecase";


const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
}; 

describe("Unit test create product usecase", () => {

    it("should create a product", async () => {
        const input = {
            name: "Product A",
            price: 19.99
        }
        const repository = MockRepository();
        const usecase = new CreateProductUseCase(repository);

        const output = await usecase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        });
    })

    it("should thrown an error when name is missing", async () => {
        const input = {
            name: "",
            price: 19.99
        }
        const repository = MockRepository();
        const usecase = new CreateProductUseCase(repository);

        await expect(usecase.execute(input)).rejects.toThrow(
            "Name is required"
        );
    });

    it("should thrown an error when price is less than zero", async () => {
        const input = {
            name: "Product A",
            price: -1
        }
        const repository = MockRepository();
        const usecase = new CreateProductUseCase(repository);

        await expect(usecase.execute(input)).rejects.toThrow(
            "Price must be greater than zero"
        );
    });
})