import { getHistory, getAttendedHistory } from "../controllers/historyController.js";
import { mockProfiles } from "../mocks/mockProfiles.js";
import { jest } from '@jest/globals';

// Utility to mock Express res
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("history Controller", () => {
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
    it("returns all events from a incomplete profile", async () => {
      const req = { params: { accountId: mockProfiles.incomplete.accountId } };
      const res = mockResponse();

      await getHistory(req, res);

      expect(res.json).toHaveBeenCalledWith(mockProfiles.incomplete.eventHistory);
    });
  });
  
  describe("getAttendedHistory", () => {
    it("returns all attended events from a complete volunteer profile with missed attendances", async () => {
      const req = { params: { accountId: mockProfiles.complete.accountId } };
      const res = mockResponse();

      await getAttendedHistory(req, res);

      expect(res.json).toHaveBeenCalledWith(mockProfiles.complete.eventHistory.filter(event => event.attended));
    });

    it("get attendance properly handles an complete full attendance admin profile", async () => {
      const req = { params: { accountId: mockProfiles.admin.accountId } };
      const res = mockResponse();

      await getAttendedHistory(req, res);

      expect(res.json).toHaveBeenCalledWith(mockProfiles.admin.eventHistory.filter(event => event.attended));
    });


    it("get attendance properly handles an incomplete profile", async () => {
      const req = { params: { accountId: mockProfiles.incomplete.accountId } };
      const res = mockResponse();

      await getAttendedHistory(req, res);

      expect(res.json).toHaveBeenCalledWith(mockProfiles.incomplete.eventHistory.filter(event => event.attended));
    });
  });
  
});
