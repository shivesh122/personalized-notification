const fs = require('fs');
const path = require('path');


function loadData() {
  const p = path.join(__dirname, '..', 'data', 'tasks.json');
  const raw = fs.readFileSync(p, 'utf8');
  return JSON.parse(raw);
}


function messageFor(user, task) {
  
  const name = user.name || user.id;
  const t = task.title;
  const due = task.due ? ` (due ${task.due})` : '';
  const prefix = `Hello ${name},`;
  const body = `let's complete your "${t}" today${due}!`;
  return `${prefix} ${body}`;
}

module.exports = async (req, res) => {
  try {
    const data = loadData();
    const q = req.query || {};
    
    const filterUser = q.user;
    const doSend = q.send === 'true';
    const dry = q.dry === 'true';

    const targetUsers = filterUser
      ? data.users.filter(u => u.id.toLowerCase() === filterUser.toLowerCase())
      : data.users;

    const notifications = [];

    targetUsers.forEach(user => {
      const pending = (user.tasks || []).filter(t => !t.completed);
      pending.forEach(task => {
        const msg = messageFor(user, task);
        const note = {
          user: user.id,
          name: user.name,
          taskId: task.id,
          taskTitle: task.title,
          message: msg,
          priority: task.priority || 'normal'
        };
        notifications.push(note);
        
        if (doSend && !dry) {
          console.log('[SIMULATED SEND]', JSON.stringify(note));
        }
      });
    });

    if (!q.user && !q.send && notifications.length) {
      console.log('[CRON RUN] Generated', notifications.length, 'notifications');
      notifications.forEach(n => console.log('[CRON NOTIFY]', n.user, '-', n.message));
    }

    return res.status(200).json({
      ok: true,
      triggeredBy: q.user ? `manual?user=${q.user}` : (req.headers['x-vercel-cron'] ? 'vercel-cron' : 'manual'),
      count: notifications.length,
      notifications
    });
  } catch (err) {
    console.error('notify.js error', err);
    return res.status(500).json({ ok: false, error: String(err) });
  }
};
