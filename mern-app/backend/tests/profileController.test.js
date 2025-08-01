import { getProfile, updateProfile} from "../controllers/profileController.js";
import { mockProfiles } from "../mocks/mockProfiles.js";
import { jest } from '@jest/globals';

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Profile Controller", () => {
  describe("getProfile", () => {
    it("returns a complete profile", async () => {
      const req = { params: { accountId: mockProfiles.complete.accountId } };
      const res = mockResponse();

      await getProfile(req, res);

      expect(res.json).toHaveBeenCalledWith(mockProfiles.complete);
    });

    it("returns an incomplete profile structure", async () => {
      const req = { params: { accountId: mockProfiles.incomplete.accountId } };
      const res = mockResponse();

      await getProfile(req, res);

      expect(res.json).toHaveBeenCalledWith(mockProfiles.incomplete);
    });

    it("returns admin profile", async () => {
      const req = { params: { accountId: mockProfiles.admin.accountId } };
      const res = mockResponse();

      await getProfile(req, res);
      expect(res.json).toHaveBeenCalledWith(mockProfiles.admin);
    });

    it("handles missing accountId", async () => {
      const req = { params: {} };
      const res = mockResponse();

      await getProfile(req, res);

      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        accountId: undefined,
      }));
    });
  });

  describe("updateProfile", () => {
    it("successfully updates profile", async () => {
      const req = {
        params: { accountId: "123" },
        body: mockProfiles.complete,
      };
      const res = mockResponse();

      await updateProfile(req, res);

      expect(res.json).toHaveBeenCalledWith({
        message: "Mock profile updated",
        profile: mockProfiles.complete,
      });
    });

    it("accepts partial updates", async () => {
      const partial = {
        fullName: "New Name",
        city: "Dallas",
      };
      const req = {
        params: { accountId: "123" },
        body: partial,
      };
      const res = mockResponse();

      await updateProfile(req, res);

      expect(res.json).toHaveBeenCalledWith({
        message: "Mock profile updated",
        profile: partial,
      });
    });

    it("handles empty body safely", async () => {
      const req = {
        params: { accountId: "123" },
        body: {},
      };
      const res = mockResponse();

      await updateProfile(req, res);

      expect(res.json).toHaveBeenCalledWith({
        message: "Mock profile updated",
        profile: {},
      });
    });
  });

  describe("getHistory", () => {
    it("returns all events from a complete volunteer profile", async () => {
      const req = { params: { accountId: mockProfiles.complete.accountId } };
      const res = mockResponse();

      await getHistory(req, res);

      expect(res.json).toHaveBeenCalledWith(mockProfiles.complete.eventHistory);
    });
    it("returns all events from a complete admin profile", async () => {
      const req = { params: { accountId: mockProfiles.admin.accountId } };
      const res = mockResponse();

      await getHistory(req, res);

      expect(res.json).toHaveBeenCalledWith(mockProfiles.admin.eventHistory);
    });
    it("handles an incomplete profile safely", async () => {
      const req = { params: { accountId: mockProfiles.incomplete.accountId } };
      const res = mockResponse();

      await getHistory(req, res);

      expect(res.json).toHaveBeenCalledWith(mockProfiles.incomplete.eventHistory);
    });
  });
  
  describe("getAttendedHistory", () => {

    it("includes attended events", async () => {
      const req = { params: { accountId: mockProfiles.admin.accountId } };
      const res = mockResponse();

      await getAttendedHistory(req, res);

      expect(res.json).toHaveBeenCalledWith(mockProfiles.admin.eventHistory.filter(event => event.attended));
    });

    it("properly omits unattended events", async () => {
      const req = { params: { accountId: mockProfiles.complete.accountId } };
      const res = mockResponse();

      await getAttendedHistory(req, res);

      expect(res.json).toHaveBeenCalledWith(mockProfiles.complete.eventHistory.filter(event => event.attended));
    });

    it("handles an incomplete profile safely", async () => {
      const req = { params: { accountId: mockProfiles.incomplete.accountId } };
      const res = mockResponse();

      await getAttendedHistory(req, res);

      expect(res.json).toHaveBeenCalledWith(mockProfiles.incomplete.eventHistory.filter(event => event.attended));
    });
  });
});
