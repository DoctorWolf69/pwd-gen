import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [length, setLength] = useState(12);
  const [includeLetters, setIncludeLetters] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    if (!includeLetters && !includeNumbers && !includeSymbols) {
      alert('Please select at least one character type!');
      return;
    }

    let charset = '';
    if (includeLetters) charset += 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    let generated = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      generated += charset[randomIndex];
    }
    setPassword(generated);
    setCopied(false);
  };

  const copyToClipboard = () => {
    if (!password) {
      alert('Nothing to copy! Generate a password first.');
      return;
    }
    navigator.clipboard.writeText(password).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="container">
      <h1 className="title">Password Generator</h1>
      <div className="password-box">
        <input type="text" value={password} readOnly />
        <button
          onClick={copyToClipboard}
          className={copied ? 'copied' : ''}
        >
          {copied ? '✔️' : '📋'}
        </button>
      </div>

      <div className="controls">
        <label className="label-block">
          <span>Password Length:</span>
          <input
            type="number"
            min="4"
            max="32"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
          />
        </label>

        <label className="label-inline">
          <input
            type="checkbox"
            checked={includeLetters}
            onChange={() => setIncludeLetters(!includeLetters)}
          />
          Alphabets
        </label>

        <label className="label-inline">
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={() => setIncludeNumbers(!includeNumbers)}
          />
          Numbers
        </label>

        <label className="label-inline">
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={() => setIncludeSymbols(!includeSymbols)}
          />
          Special Characters
        </label>

        <button className="generate-btn" onClick={generatePassword}>Generate Password</button>
      </div>
    </div>
  );
};

export default App;