import { useState } from 'react';
import { supabase } from './supabaseClient';

function App() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function createTestPlayer() {
    setLoading(true);
    setMessage('');

    const username = 'testuser_' + Math.floor(Math.random() * 100000);
    const email = username + '@example.com';

  const { data, error } = await supabase
  .from('players')
  .insert({
    username,
    email,
    balance_cents: 0,
  })
  .select()
  .single();


    if (error) {
      console.error(error);
      setMessage('Error: ' + error.message);
    } else {
      setMessage('Player created: ' + data.username);
    }

    setLoading(false);
  }

  return (
    <div
      style={{
        padding: '1.5rem',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
      }}
    >
      <h1>Lucky Waters Arcade</h1>
      <p>Supabase test: click the button to create a player in the database.</p>
      <button onClick={createTestPlayer} disabled={loading}>
        {loading ? 'Creating…' : 'Create test player'}
      </button>
      {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
    </div>
  );
}

export default App;
