const API_URL = 'http://localhost:2000'; // Replace with your API base URL

export const getClientData = async (clientID) => {
  const response = await fetch(`${API_URL}/client-data/${clientID}`);
  if (!response.ok) {
    throw new Error('Error fetching client data');
  }
  return response.json();
};

export const getMainMenuData = async () => {
  const response = await fetch(`${API_URL}/mainmenu`);
  if (!response.ok) {
    throw new Error('Error fetching main menu data');
  }
  return response.json();
};

export const getWeeklyData = async () => {
  const response = await fetch(`${API_URL}/weekmenu`);
  if (!response.ok) {
    throw new Error('Error fetching weekly data');
  }
  return response.json();
};

export const getClientDataByQuarter = async (clientID, quarter) => {
  // Assuming your API expects quarter in the format 'Q1', 'Q2', etc.
  const response = await fetch(`${API_URL}/client-data/${clientID}/quarter/${quarter}`);
  if (!response.ok) {
    throw new Error(`Error fetching client data for client ${clientID} and quarter ${quarter}`);
  }
  return response.json();
};

export const getAllClientIDs = async () => {
  const response = await fetch(`${API_URL}/get-all-clients`);
  if (!response.ok) {
    throw new Error('Error fetching all client IDs');
  }
  return response.json();
};

export const getClientSources = async (clientID) => {
  const response = await fetch(`${API_URL}/client-data/${clientID}/sources`);
  if (!response.ok) {
    throw new Error('Error fetching client sources');
  }
  return response.json();
};

export const getClientSourcesByQuarter = async (clientID, quarter) => {
  const response = await fetch(`${API_URL}/client-data/${clientID}/quarter/${quarter}/sources`);
  if (!response.ok) {
    throw new Error('Error fetching client sources by quarter');
  }
  return response.json();
};

export const getSourcePercentageByQuarter = async () => {
  const response = await fetch(`${API_URL}/sources/quarters`);
  if (!response.ok) {
    throw new Error('Error fetching source percentage data by quarter');
  }
  return response.json();
};

export const getClientDataForQuarter = async (clientID, quarter) => {
  const weekStart = (quarter - 1) * 12 + 1; // Calculate the starting week for the quarter
  const weekEnd = quarter * 12; // Calculate the ending week for the quarter
  const response = await fetch(`${API_URL}/client-data/${clientID}/weeks/${weekStart}-${weekEnd}`);
  if (!response.ok) {
    throw new Error(`Error fetching client data for quarter ${quarter}`);
  }
  return response.json();
};

export const getWeeklyDataForClient = async (clientID) => {
  const response = await fetch(`${API_URL}/weekmenu/${clientID}`); // Make sure the backend supports this endpoint
  if (!response.ok) {
    throw new Error('Error fetching weekly data for client: ' + clientID);
  }
  return response.json();
};

