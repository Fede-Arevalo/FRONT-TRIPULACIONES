import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import incidentsService from "./incidentsService";

const initialState = {
  incidents: [],
  incident: {},
  isLoading: false,
};

export const createIncident = createAsyncThunk(
  "incidents/createIncident",
  async (incidentData) => {
    try {
      return await incidentsService.createIncident(incidentData);
    } catch (error) {
      console.error(error);
    }
  }
);

export const deleteIncidentById = createAsyncThunk(
  "incidents/deleteIncidentById",
  async (_id) => {
    try {
      return await incidentsService.deleteIncidentById(_id);
    } catch (error) {
      console.error(error);
    }
  }
);

export const getAllIncidents = createAsyncThunk(
  "incidents/getAllIncidents",
  async () => {
    try {
      return await incidentsService.getAllIncidents();
    } catch (error) {
      console.error(error);
    }
  }
);
export const getIncidentsXCategory = createAsyncThunk(
  "incidents/getIncidentsXCategory",
  async (category) => {
    try {
      return await incidentsService.getIncidentsXCategory(category);
    } catch (error) {
      console.error(error);
    }
  }
);

export const getIncidentById = createAsyncThunk(
  "incidents/getIncidentById",
  async (_id) => {
    try {
      return await incidentsService.getIncidentById(_id);
    } catch (error) {
      console.error(error);
    }
  }
);
export const getAllIncidentsSent = createAsyncThunk(
  "incidents/getAllIncidentsSent",
  async () => {
    try {
      return await incidentsService.getAllIncidentsSent();
    } catch (error) {
      console.error(error);
    }
  }
);
export const getAllIncidentsPending = createAsyncThunk(
  "incidents/getAllIncidentsPending",
  async () => {
    try {
      return await incidentsService.getAllIncidentsPending();
    } catch (error) {
      console.error(error);
    }
  }
);

export const updateIncidentById = createAsyncThunk(
  "incidents/updateIncidentById",
  async (_id) => {
    try {
      return await incidentsService.updateIncidentById(_id);
    } catch (error) {
      console.error(error);
    }
  }
);
export const sentIncidents = createAsyncThunk(
  "incidents/sendIncidents",
  async (_id) => {
    try {
      return await incidentsService.sentIncidents(_id);
    } catch (error) {
      console.error(error);
    }
  }
);
export const pendingIncidents = createAsyncThunk(
  "incidents/pendingIncidents",
  async (_id) => {
    try {
      return await incidentsService.pendingIncidents(_id);
    } catch (error) {
      console.error(error);
    }
  }
);

export const incidentsSlice = createSlice({
  name: "incidents",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createIncident.fulfilled, (state, action) => {
        state.incident = action.payload;
      })

      .addCase(getAllIncidents.fulfilled, (state, action) => {
        state.incidents = action.payload;
      })
      .addCase(getIncidentsXCategory.fulfilled, (state, action) => {
        state.incidents = action.payload;
      })
      .addCase(getIncidentsXCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllIncidents.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getIncidentById.fulfilled, (state, action) => {
        state.incident = action.payload;
      })
      .addCase(deleteIncidentById.fulfilled, (state, action) => {
        state.incidents = state.incidents.filter(
          (incident) => incident._id !== action.payload.incident._id
        );
      })
      .addCase(updateIncidentById.fulfilled, (state, action) => {
        state.incident = action.payload.incident;
      })
      .addCase(sentIncidents.fulfilled, (state, action) => {
        const incidents = state.incidents.map((incident) => {
          if (incident._id === action.payload._id) {
            incident = action.payload;
          }
          return incident;
        });
        state.incidents = incidents;
      })
      .addCase(pendingIncidents.fulfilled, (state, action) => {
        const incidents = state.incidents.map((incident) => {
          if (incident._id === action.payload._id) {
            incident = action.payload;
          }
          return incident;
        });
        state.incidents = incidents;
      });
  },
});

export const { reset } = incidentsSlice.actions;

export default incidentsSlice.reducer;
