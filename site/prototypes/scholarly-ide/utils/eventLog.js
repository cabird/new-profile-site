/* ─── Global Event Log (for OUTPUT tab) ─── */
const { useState, useEffect } = React;

IDE.eventLog = [];
IDE.eventListeners = new Set();

IDE.logEvent = function logEvent(type, detail) {
  const ts = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
  IDE.eventLog.push({ ts, type, detail });
  if (IDE.eventLog.length > 200) IDE.eventLog.shift();
  IDE.eventListeners.forEach(fn => fn([...IDE.eventLog]));
};

IDE.useEventLog = function useEventLog() {
  const [log, setLog] = useState(() => [...IDE.eventLog]);
  useEffect(() => {
    IDE.eventListeners.add(setLog);
    return () => IDE.eventListeners.delete(setLog);
  }, []);
  return log;
};

IDE.logEvent('system', 'Research IDE initialized');
