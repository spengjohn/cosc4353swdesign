export const mockEvents = {
  bothAttend: {
    eventId: "234",
   title:"Community Cooking",
   description:"Cooking for the community.",
   location:"123 ave",
   city:"Houston",
   state:"TX",
   date:"2025-08-01",
   urgency:"Urgent",
   skillsRequired:["Cooking"],
   assignedVolunteers:["789","123"],
  },

  oneAttend: {

    eventId: "345",
   title:"Substitute Teaching",
   description:"Library Teaching.",
   location:"321 ave",
   city:"Dallas",
   state:"TX",
   date:"2025-08-03",
   urgency:"Not urgent",
   skillsRequired:["Teaching"],
   assignedVolunteers:["789"],
  },


  noAttend: {

    eventId: "456",
   title:"Cooking Event",
   description:"Cooking at a community event.",
   location:"321 dr",
   city:"Houston",
   state:"TX",
   date:"2025-09-03",
   urgency:"Urgent",
   skillsRequired:["Cooking"],
   assignedVolunteers:[],
  },

    incomplete: {
    eventId: "567",
   title:"",
   description:"",
   location:"",
   city:"",
   state:"",
   date:"",
   urgency:"",
   skillsRequired:[],
   assignedVolunteers:[],
  },
};
