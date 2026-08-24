const API_BASE = "http://localhost:5050/api";

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    }
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

const API = {
  login(email) {
    return apiRequest("/login", {
      method: "POST",
      body: JSON.stringify({ email })
    });
  },

  getIssues() {
    return apiRequest("/issues");
  },

  getIssue(id) {
    return apiRequest(`/issues/${encodeURIComponent(id)}`);
  },

  createIssue(payload) {
    return apiRequest("/issues", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  },

  updateIssueStatus(id, status) {
    return apiRequest(`/issues/${encodeURIComponent(id)}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status })
    });
  },

  getIssueReports(id) {
    return apiRequest(`/issues/${encodeURIComponent(id)}/reports`);
  }
};

window.API = API;
