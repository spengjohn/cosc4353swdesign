import { getEvent, getAttendees, updateEvent} from "../controllers/eventController.js";
import { mockEvents } from "../mocks/mockEvents.js";
import { jest } from '@jest/globals';

// Utility to mock Express res
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Event Controller", () => {
  describe("getEvent", () => {
    it("returns a complete event with attendees", async () => {
      const req = { params: { eventId: mockEvents.bothAttend.eventId } };
      const res = mockResponse();

      await getEvent(req, res);

      expect(res.json).toHaveBeenCalledWith(mockEvents.bothAttend);
    });

    it("returns a complete event one attendee", async () => {
      const req = { params: { eventId: mockEvents.oneAttend.eventId } };
      const res = mockResponse();

      await getEvent(req, res);

      expect(res.json).toHaveBeenCalledWith(mockEvents.oneAttend);
    });

    it("returns a complete event no attendees", async () => {
      const req = { params: { eventId: mockEvents.noAttend.eventId } };
      const res = mockResponse();

      await getEvent(req, res);

      expect(res.json).toHaveBeenCalledWith(mockEvents.noAttend);
    });

    it("handles an incomplete event safely", async () => {
      const req = { params: { eventId: mockEvents.incomplete.eventId } };
      const res = mockResponse();

      await getEvent(req, res);

      expect(res.json).toHaveBeenCalledWith(mockEvents.incomplete);
    });

    
        it("handles missing eventId", async () => {
          const req = { params: {} };
          const res = mockResponse();
    
          await getEvent(req, res);
    
          expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            eventId: undefined,
          }));
        });
  });

  
  describe("updateEvent", () => {
    it("successfully updates event", async () => {
      const req = {
        params: { eventId: "234" },
        body: mockEvents.bothAttend,
      };
      const res = mockResponse();

      await updateEvent(req, res);

      expect(res.json).toHaveBeenCalledWith({
        message: "Mock event updated",
        event: mockEvents.bothAttend,
      });
    });

    it("accepts partial updates", async () => {
      const partial = {
        title: "New Name",
        city: "Baytown",
      };
      const req = {
        params: { eventId: "234" },
        body: partial,
      };
      const res = mockResponse();

      await updateEvent(req, res);

      expect(res.json).toHaveBeenCalledWith({
        message: "Mock event updated",
        event: partial,
      });
    });

    it("handles empty body safely", async () => {
      const req = {
        params: { eventId: "234" },
        body: {},
      };
      const res = mockResponse();

      await updateEvent(req, res);

      expect(res.json).toHaveBeenCalledWith({
        message: "Mock event updated",
        event: {},
      });
    });
  });

  describe("getAttendees", () => {
      it("returns all attendees from a complete event with multiple attendees", async () => {
        const req = { params: { eventId: mockEvents.bothAttend.eventId } };
        const res = mockResponse();
  
        await getAttendees(req, res);
  
        expect(res.json).toHaveBeenCalledWith(mockEvents.bothAttend.assignedVolunteers);
      });
      
      it("returns the attendee from a complete event with one attendee", async () => {
        const req = { params: { eventId: mockEvents.oneAttend.eventId } };
        const res = mockResponse();
  
        await getAttendees(req, res);
  
        expect(res.json).toHaveBeenCalledWith(mockEvents.oneAttend.assignedVolunteers);
      });
      
      it("handles an event with no attendees safely", async () => {
        const req = { params: { eventId: mockEvents.noAttend.eventId } };
        const res = mockResponse();
  
        await getAttendees(req, res);
  
        expect(res.json).toHaveBeenCalledWith(mockEvents.noAttend.assignedVolunteers);
      });

      it("handles an incomplete event safely", async () => {
        const req = { params: { eventId: mockEvents.incomplete.eventId } };
        const res = mockResponse();
  
        await getAttendees(req, res);
  
        expect(res.json).toHaveBeenCalledWith(mockEvents.incomplete.assignedVolunteers);
      });

      
      it("handles missing eventId", async () => {
       const req = { params: {} };
          const res = mockResponse();
    
          await getEvent(req, res);
    
          expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            eventId: undefined,
          }));
      });

      
     });
});
