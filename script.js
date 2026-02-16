const ctaButton = document.getElementById("ctaButton");
const yearNode = document.getElementById("year");
const agentLogFeed = document.getElementById("agentLogFeed");

const baselineLogs = [
  "[Agent_042]: Voltage dip detected in Sector 7G. Initiating discharge.",
  "[Agent_Trading_09]: Buy signal confirmed. LCOE threshold met.",
  "[Agent_Green]: Displacing Coal-gen @ 450kg CO2/MWh. Target achieved."
];

const rollingLogs = [
  "[A3_Node_14]: Cell thermal variance normalized. Degradation risk downgraded.",
  "[Swarm_MARL_03]: Competitor reserve bids modeled. Executing adaptive spread.",
  "[Proxy_REC_11]: Renewable provenance verified. REC mint queued.",
  "[Orchestrator]: Safety-priority lock engaged for Cluster Delta.",
  "[Agent_Grid_22]: Frequency drift corrected via 4.2MW pulse response.",
  "[Agent_Green]: Carbon intensity window improved. Dispatch shifted to maximize displacement."
];

let feedIndex = 0;

function appendAgentLog(line) {
  if (!agentLogFeed) {
    return;
  }

  const entry = document.createElement("p");
  entry.className = "agent-log-line";
  entry.textContent = line;

  agentLogFeed.appendChild(entry);
  if (agentLogFeed.children.length > 12) {
    agentLogFeed.removeChild(agentLogFeed.firstElementChild);
  }
  agentLogFeed.scrollTop = agentLogFeed.scrollHeight;
}

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

baselineLogs.forEach((line) => appendAgentLog(line));

setInterval(() => {
  appendAgentLog(rollingLogs[feedIndex]);
  feedIndex = (feedIndex + 1) % rollingLogs.length;
}, 2400);

if (ctaButton) {
  ctaButton.addEventListener("click", () => {
    appendAgentLog("[Orchestrator]: Global command received. Agentic Layer entering synchronized mode.");
    ctaButton.textContent = "Orchestrator Online ✔";
    ctaButton.disabled = true;
  });
}