'use client';

import { useState } from 'react';

const customers = [
  ['John Kamau', 'Haircut + Beard', 'Due today', 'JK'],
  ['Mary Wanjiku', 'Knotless braids', 'Due today', 'MW'],
  ['Peter Otieno', 'Haircut', 'Due soon', 'PO'],
];
const bookings = [['09:00', 'John Kamau', 'Haircut'], ['10:00', 'Peter Otieno', 'Haircut + Beard'], ['11:30', 'James Mwangi', 'Beard trim']];

export default function Home() {
  const [tab, setTab] = useState('Home');
  const [showSetup, setShowSetup] = useState(true);
  const [notice, setNotice] = useState('');
  const action = (message: string) => setNotice(message);

  return <main className="rudi-app">
    <aside className="rudi-sidebar">
      <a className="rudi-brand" href="#top"><img src="/rudi-logo.png" alt="RUDI"/><span>RUDI</span></a>
      <button className="business-picker">Brian&apos;s Barbershop <b>⌄</b></button>
      <nav aria-label="RUDI navigation">{['Home', 'Chat', 'Bookings', 'Customers'].map((item) => <button key={item} onClick={() => setTab(item)} className={tab === item ? 'selected' : ''}>{item === 'Home' ? '⌂' : item === 'Chat' ? '◌' : item === 'Bookings' ? '□' : '♙'} <span>{item}</span>{item === 'Chat' && <em>3</em>}</button>)}</nav>
      <div className="side-footer"><button onClick={() => action('Settings are opening soon.')}>⚙ <span>Settings</span></button><p>Customers come.<br/>RUDI brings them back.</p></div>
    </aside>

    <section className="rudi-content" id="top">
      <header className="rudi-topbar"><div className="mobile-logo"><img src="/rudi-logo.png" alt="RUDI"/>RUDI</div><button aria-label="Notifications" className="round-button">♢</button><button aria-label="Account" className="profile-button">B</button></header>
      {notice && <button className="notice" onClick={() => setNotice('')}>{notice} <span>×</span></button>}
      <div className="hero"><div><p className="kicker">Friday, 29 August</p><h1>{tab === 'Home' ? <>Good morning, Brian <span>👋</span></> : tab}</h1><p>{tab === 'Home' ? 'Here’s the simple picture of your business today.' : `Manage your ${tab.toLowerCase()} without the clutter.`}</p></div><button className="gold-button" onClick={() => action('New booking form is next in this build.')}>+ New booking</button></div>

      {tab === 'Home' && <>
        <section className="metric-grid"><Metric icon="▣" label="Appointments today" value="8" detail="3 still to come"/><Metric icon="↗" label="Customers due" value="12" detail="Ready for a reminder" gold/><Metric icon="◌" label="Unread chats" value="3" detail="Reply when you’re ready"/></section>
        <section className="return-card"><div><p className="kicker">Customer return</p><h2>12 customers are due today</h2><p>Send individual, personalised reminders when your customers are likely to come back.</p></div><div><button className="outline-button" onClick={() => action('Message preview is being prepared.')}>Preview message</button><button className="ink-button" onClick={() => action('Reminders will send after WhatsApp or SMS is connected.')}>Send reminders →</button></div></section>
        <div className="two-column"><section className="card"><CardHead title="Today’s bookings" detail="Friday, 29 August" link="View calendar" onClick={() => setTab('Bookings')}/><div className="booking-list">{bookings.map(([time,name,service]) => <div key={time}><time>{time}</time><i>{name[0]}</i><p><b>{name}</b><small>{service}</small></p><button aria-label="Booking options">•••</button></div>)}</div></section><section className="card"><CardHead title="Recent chats" detail="Keep conversations moving" link="Open chat" onClick={() => setTab('Chat')}/><div className="chat-list">{[['J','John Kamau','How much is a haircut?','2m'],['M','Mary Wanjiku','Tomorrow at 10 works for me.','28m'],['P','Peter Otieno','Thanks, see you then!','1h']].map(([i,n,m,t]) => <div key={n}><i>{i}</i><p><b>{n}</b><small>{m}</small></p><time>{t}</time></div>)}</div></section></div>
        <section className="card customers-card"><CardHead title="Customers to remind" detail="Based on their usual visit schedule" link="View customers" onClick={() => setTab('Customers')}/>{customers.map(([name,service,status,initials]) => <div className="customer-row" key={name}><i>{initials}</i><p><b>{name}</b><small>{service}</small></p><span className={status === 'Due today' ? 'due' : 'soon'}>{status}</span><button className="outline-button" onClick={() => action(`Reminder prepared for ${name}.`)}>Remind</button></div>)}</section>
      </>}
      {tab !== 'Home' && <section className="empty-surface"><img src="/rudi-logo.png" alt=""/><h2>{tab} is being connected</h2><p>The secure RUDI API is ready. This screen is the next product slice and will use your business data—not sample data.</p><button className="gold-button" onClick={() => setTab('Home')}>Back to home</button></section>}
    </section>
    {showSetup && <section className="setup-drawer"><button className="close" onClick={() => setShowSetup(false)} aria-label="Close setup">×</button><p className="kicker">First steps</p><h2>Set up RUDI in minutes</h2><p>Start with customers. You can connect messaging later.</p><button className="drawer-step" onClick={() => setTab('Customers')}><b>1</b><span><strong>Import customers</strong><small>CSV or Excel, with review first</small></span>→</button><button className="drawer-step" onClick={() => action('Service setup is next.')}><b>2</b><span><strong>Add services</strong><small>Price and duration are optional</small></span>→</button><button className="drawer-step" onClick={() => action('Messaging setup is next.')}><b>3</b><span><strong>Connect messaging</strong><small>WhatsApp or SMS when ready</small></span>→</button></section>}
  </main>;
}
function Metric({icon,label,value,detail,gold=false}:{icon:string,label:string,value:string,detail:string,gold?:boolean}) { return <article className="metric"><i className={gold?'gold-icon':''}>{icon}</i><p>{label}</p><strong>{value}</strong><small>{detail}</small></article>; }
function CardHead({title,detail,link,onClick}:{title:string,detail:string,link:string,onClick:()=>void}) { return <header className="card-head"><div><h2>{title}</h2><p>{detail}</p></div><button onClick={onClick}>{link} →</button></header>; }
