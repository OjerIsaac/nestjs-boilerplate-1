import { validateUUID } from "./validation";

describe("Validation", () => {
    it("should return false for empty string", async () => {
        expect(validateUUID("")).toEqual(false);
    });

    it("should return false for empty undefined", async () => {
        expect(validateUUID(null)).toEqual(false);
    });

    it("should return false for empty null", async () => {
        expect(validateUUID(undefined)).toEqual(false);
    });

    it("should return false for non uuid string", async () => {
        expect(validateUUID("hello")).toEqual(false);
        expect(validateUUID("V1StGXR8_Z5jdHi6B-myT")).toEqual(false);
    });

    it("should return true for uuid string", async () => {
        expect(validateUUID("9879ddb0-420a-4d83-8694-8343d56dc1f5")).toEqual(true);
        expect(validateUUID("2fc2911d-786d-41d0-be70-993364305312")).toEqual(true);
    });
});
