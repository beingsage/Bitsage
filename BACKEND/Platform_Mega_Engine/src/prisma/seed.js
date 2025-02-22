"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_js_1 = __importDefault(require("./prismaconnect/prisma.js"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // Create 5 dummy users
        const users = yield Promise.all(Array.from({ length: 5 }).map(() => prisma_js_1.default.user.create({
            data: {
                username: `user${Math.floor(Math.random() * 10000)}`,
                email: `user${Math.floor(Math.random() * 10000)}@example.com`,
                fullName: `User ${Math.floor(Math.random() * 10000)}`,
                password: "password123", // Use a hashed password in production
                refreshToken: "sample-refresh-token",
                description: "This is a description",
            },
        })));
        // Create 5 dummy blog posts for each user
        yield Promise.all(users.map((user) => prisma_js_1.default.blogPost.createMany({
            data: Array.from({ length: 5 }).map(() => ({
                title: `Blog Post ${Math.floor(Math.random() * 10000)}`,
                description: "This is a blog post description.",
                isPublished: true,
                duration: 120.5,
                views: Math.floor(Math.random() * 1000),
                ownerId: user.id,
            })),
        })));
        console.log("Seeding complete!");
    });
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_js_1.default.$disconnect();
}));
