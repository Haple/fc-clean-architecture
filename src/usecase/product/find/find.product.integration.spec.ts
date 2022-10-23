import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "./find.product.usecase";


describe("Integration test find product usecase", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should find a product", async () => {
        const product = new Product(
            "123", "Product A", 19.99
        );
        const input = {
            id: "123"
        }
        const repository = new ProductRepository();
        await repository.create(product);

        const usecase = new FindProductUseCase(repository);
        const output = await usecase.execute(input);

        expect(output).toEqual({
            id: input.id,
            name: product.name,
            price: product.price
        });

    })
})