import { expect } from "chai"; 
import request  from "supertest";

const baseUrl = "https://kasir-api.zelz.my.id";
let accessToken;
let refreshToken;


describe.skip("get registration", () => {
    it("create account", async () => {
        const response = await request(baseUrl)
            .post("/registration")
            .send({
                "name": "Toko ameng",
                "email": "tokoameng@ex.com",
                "password": "123yes",
            });

        expect(response.status).to.equal(201);
        console.log(response.body);
    });
});

describe("get login", () => {
    it("login", async () => {
        const response = await request(baseUrl)
            .post("/authentications")
            .send({
                "email": "tokoameng@ex.com",
                "password": "123yes",
            });
        accessToken=(await response).body.data.accessToken
        refreshToken=(await response).body.data.refreshToken
        expect((await response).status).to.equal(201);
        expect((await response).body.status).to.equal("success");
        expect((await response).body.message).to.equal("Authentication berhasil ditambahkan");
        console.log("accessToken:",accessToken);
        console.log("refreshToken:",refreshToken);
    });
});

describe("Add Unit", () => {
    it.skip("Add Unit", async () => {
        const response = await request(baseUrl)
            .post("/units")
            .send({
             "name": "gram",
             "description": "weight measurement"
                   
            })
            .set("Authorization",`Bearer ${accessToken}`);
            console.log((await response).body)
            expect((await response).status).to.equal(201);
            expect((await response).body.status).to.equal("success");
            expect((await response).body.message).to.equal("Unit berhasil ditambahkan");
            
    });
    it("get Unit", async () => {
        const response = await request(baseUrl)
            .get("/units")
            .set("Authorization",`Bearer ${accessToken}`);
            console.log((await response).body.data.units[0]);
            expect((await response).status).to.equal(200);
            expect((await response).body.status).to.equal("success");
            
                      
    }).timeout(5000)

    describe("Add Categories", () => {
        it ("Add Categories", async () => {
            const response = await request(baseUrl)
                .post("/categories")
                .send({
                "name": "Siomay",
                "description": "makanan"
                })

                .set("Authorization",`Bearer ${accessToken}`);
                console.log((await response).body)
                expect((await response).status).to.equal(201);
                expect((await response).body.status).to.equal("success");
                expect((await response).body.message).to.equal("Category berhasil ditambahkan");
               
        });
    
    });

    describe("Add Customers", () => {
        it ("Add Customers", async () => {
            const response = await request(baseUrl)
                .post("/customers")
                .send({
                "name": "Budi",
                "phone": "081234567890",
                "address": "Bandoeng",
                "description": "Budi anak Pak Edi"

                })

                .set("Authorization",`Bearer ${accessToken}`);
                console.log((await response).body)
                expect((await response).status).to.equal(201);
                expect((await response).body.status).to.equal("success");
                expect((await response).body.message).to.equal("Customer berhasil ditambahkan");
               
        });
    });

});