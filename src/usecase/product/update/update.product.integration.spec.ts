import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";


describe("Integration test update product usecase", () => {

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

    it("should update product", async () => {
        const product = new Product(
            "123", "Product A", 19.99
        );
        const input = {
            id: product.id,
            name: "Product Updated",
            price: 33.56
        };
        const repository = new ProductRepository();
        await repository.create(product);

        const usecase = new UpdateProductUseCase(repository);
        const output = await usecase.execute(input);

        expect(output).toEqual(input);
    })
})