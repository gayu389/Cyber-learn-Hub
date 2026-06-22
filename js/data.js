// ===========================
// CyberLearn Hub — data.js
// ===========================

const MODULES = {
  awareness: {
    title: 'Security Awareness', icon: 'ti-shield', colorClass: 'green',
    lessons: [
      { title: 'What is cybersecurity?',        desc: 'Intro to digital threats & attack surfaces',    diff: 'easy', done: true  },
      { title: 'Social engineering tactics',     desc: 'Manipulation, pretexting, and baiting',         diff: 'med',  done: true  },
      { title: 'The human firewall',             desc: 'Why people are the #1 attack vector',           diff: 'easy', done: true  },
      { title: 'Password hygiene',               desc: 'Why weak passwords fail and how to fix them',   diff: 'easy', done: true  },
      { title: 'Multi-factor authentication',    desc: '2FA, TOTP, hardware keys explained',            diff: 'med',  done: true  },
      { title: 'Safe browsing habits',           desc: 'HTTPS, cookies, and browser security',         diff: 'easy', done: true  },
      { title: 'Public Wi-Fi risks',             desc: 'MITM attacks and VPN usage',                   diff: 'med',  done: true  },
      { title: 'Insider threats',                desc: 'Malicious vs. accidental insider risks',        diff: 'hard', done: true  },
      { title: 'Incident response basics',       desc: 'What to do when you suspect a breach',         diff: 'med',  done: false },
      { title: 'Security policy & compliance',   desc: 'GDPR, HIPAA, ISO 27001 overview',              diff: 'hard', done: false }
    ]
  },
  phishing: {
    title: 'Phishing Detection', icon: 'ti-fish', colorClass: 'amber',
    lessons: [
      { title: 'Types of phishing attacks',      desc: 'Spear, vishing, smishing, whaling',            diff: 'easy', done: true  },
      { title: 'Anatomy of a phishing email',    desc: 'Headers, spoofed senders, urgency cues',       diff: 'med',  done: true  },
      { title: 'Lookalike domains',              desc: 'Typosquatting and homograph attacks',          diff: 'med',  done: true  },
      { title: 'Credential harvesting sites',    desc: 'Fake login pages and what to look for',       diff: 'hard', done: true  },
      { title: 'Identifying malicious attachments', desc: 'Macros, PDFs, and Office exploits',        diff: 'hard', done: true  },
      { title: 'Reporting phishing emails',      desc: 'How to escalate and protect your org',        diff: 'easy', done: true  },
      { title: 'Business email compromise',      desc: 'CEO fraud and invoice scams',                  diff: 'hard', done: false },
      { title: 'Phishing simulation exercises',  desc: 'Red team awareness campaigns',                 diff: 'med',  done: false },
      { title: 'Anti-phishing tooling',          desc: 'DMARC, SPF, DKIM, email filters',             diff: 'hard', done: false },
      { title: 'Real-world phishing case studies', desc: 'Breakdown of major attacks',                diff: 'med',  done: false }
    ]
  },
  malware: {
    title: 'Malware Analysis', icon: 'ti-bug', colorClass: 'red',
    lessons: [
      { title: 'Malware taxonomy',               desc: 'Viruses, worms, trojans, rootkits, spyware',  diff: 'easy', done: true  },
      { title: 'Ransomware deep dive',           desc: 'Encryption, payment, and recovery',           diff: 'hard', done: true  },
      { title: 'How malware spreads',            desc: 'Email, USB, drive-by, supply chain',          diff: 'med',  done: true  },
      { title: 'Static analysis techniques',     desc: 'Strings, hashes, and file structure',         diff: 'hard', done: true  },
      { title: 'Dynamic analysis & sandboxing',  desc: 'Behavioral observation in isolation',         diff: 'hard', done: false },
      { title: 'Persistence mechanisms',         desc: 'Registry, startup, scheduled tasks',          diff: 'hard', done: false },
      { title: 'Anti-analysis tricks',           desc: 'Obfuscation, VM detection, packers',          diff: 'hard', done: false },
      { title: 'Indicators of compromise',       desc: 'IOCs, YARA rules, threat intel',             diff: 'med',  done: false },
      { title: 'Malware removal & remediation',  desc: 'Clean-up, imaging, and hardening',           diff: 'med',  done: false },
      { title: 'Building a malware lab',         desc: 'Safe environment for analysis',              diff: 'hard', done: false }
    ]
  },
  network: {
    title: 'Network Security', icon: 'ti-network', colorClass: 'blue',
    lessons: [
      { title: 'OSI model & TCP/IP stack',       desc: 'Layer-by-layer security implications',        diff: 'med',  done: true  },
      { title: 'Firewall types & configuration', desc: 'Stateful, WAF, NGFW, rules',                 diff: 'med',  done: true  },
      { title: 'VPN fundamentals',               desc: 'Tunneling protocols and split-tunnel',        diff: 'med',  done: false },
      { title: 'Intrusion detection & prevention', desc: 'IDS vs IPS, signatures, anomalies',        diff: 'hard', done: false },
      { title: 'Network scanning & recon',       desc: 'Nmap, port scanning, banner grabbing',       diff: 'hard', done: false },
      { title: 'Wireless network security',      desc: 'WPA3, evil twins, deauth attacks',           diff: 'hard', done: false },
      { title: 'DNS security',                   desc: 'DNS spoofing, DNSSEC, DoH',                  diff: 'med',  done: false },
      { title: 'DDoS attacks & mitigation',      desc: 'Volumetric, protocol, and app layer',        diff: 'med',  done: false },
      { title: 'Zero Trust architecture',        desc: 'Never trust, always verify model',           diff: 'hard', done: false },
      { title: 'Network forensics',              desc: 'Packet capture, Wireshark, evidence',        diff: 'hard', done: false }
    ]
  }
};

const QUIZZES = {
  awareness: [
    { q: 'What is the weakest link in most cybersecurity systems?',
      opts: ['Firewall software','Network hardware','Human users','Encryption algorithms'], a: 2,
      exp: 'Humans are consistently identified as the most exploitable vector — hence why security awareness training is critical.' },
    { q: 'Which of the following is the strongest password?',
      opts: ['password123','P@ssw0rd','Tr0ub4dor&3!','qwerty!2023'], a: 2,
      exp: 'Length and unpredictability matter most. A passphrase-style password with mixed characters is much harder to crack.' },
    { q: 'What does MFA stand for?',
      opts: ['Multi-Factor Authentication','Multi-File Access','Main Firewall Architecture','Managed Firewall Application'], a: 0,
      exp: 'Multi-Factor Authentication requires two or more verification methods, greatly reducing unauthorized access risk.' },
    { q: 'A colleague leaves their workstation unlocked and unattended. What is this?',
      opts: ['Social hacking','A physical security risk','An insider threat only','Password sharing'], a: 1,
      exp: 'Unattended unlocked workstations are a physical security risk that can allow unauthorized access.' },
    { q: 'Which is a reliable sign of a legitimate HTTPS website?',
      opts: ['.com extension','Padlock icon in the address bar','Fast loading speed','Professional design'], a: 1,
      exp: 'HTTPS and a padlock indicate the connection is encrypted — though it does not guarantee the site itself is safe.' }
  ],
  phishing: [
    { q: 'Which of the following is a key indicator of a phishing email?',
      opts: ['Professional logo','Urgency to act immediately','Sent from known contact','Contains an attachment'], a: 1,
      exp: 'Phishing emails often create a false sense of urgency to pressure victims into acting without thinking.' },
    { q: 'What does "spear phishing" specifically target?',
      opts: ['Random internet users','Specific individuals or organizations','Governments only','Children and elderly'], a: 1,
      exp: 'Spear phishing is highly targeted, using personal info to craft convincing messages for specific victims.' },
    { q: 'A URL like "paypa1.com" (with a number 1) is an example of:',
      opts: ['Clickjacking','Typosquatting','DNS poisoning','SSL stripping'], a: 1,
      exp: 'Typosquatting registers misspelled or lookalike domains to trick users into visiting malicious sites.' },
    { q: 'Which email protocol helps prevent spoofing by verifying sending servers?',
      opts: ['IMAP','SMTP','SPF','POP3'], a: 2,
      exp: 'SPF (Sender Policy Framework) specifies which mail servers are authorized to send email for a domain.' },
    { q: 'What should you do if you receive a suspicious email from your "bank"?',
      opts: ['Click the link to verify','Reply asking if it\'s real','Call using their official website number','Forward to colleagues'], a: 2,
      exp: 'Always contact organizations through independently verified info — never use links in suspicious emails.' }
  ],
  malware: [
    { q: 'Which malware type encrypts your files and demands payment?',
      opts: ['Spyware','Adware','Ransomware','Rootkit'], a: 2,
      exp: 'Ransomware encrypts victim files and demands a ransom (usually cryptocurrency) for the decryption key.' },
    { q: 'What is a "trojan horse" in cybersecurity?',
      opts: ['A network attack tool','Malware disguised as legitimate software','An antivirus program','A firewall bypass'], a: 1,
      exp: 'A Trojan disguises itself as legitimate software to trick users into installing it, then acts maliciously.' },
    { q: 'Which is a common initial malware infection vector?',
      opts: ['Using HTTPS websites','Opening malicious email attachments','Using strong passwords','Enabling 2FA'], a: 1,
      exp: 'Malicious email attachments (especially macros in Office docs or PDFs) remain a top infection vector.' },
    { q: 'What does "sandbox analysis" mean in malware research?',
      opts: ['Deleting the malware','Running malware in an isolated environment','Scanning with antivirus','Encrypting samples'], a: 1,
      exp: 'Sandboxing runs suspected malware in a safe, isolated environment to observe behavior without risk.' },
    { q: 'What is an Indicator of Compromise (IOC)?',
      opts: ['An encryption algorithm','Forensic evidence of a possible intrusion','A firewall rule','A password policy'], a: 1,
      exp: 'IOCs are artifacts like malicious IPs, hashes, or domains that indicate a system may have been breached.' }
  ],
  network: [
    { q: 'What does a firewall primarily do?',
      opts: ['Encrypts all network traffic','Monitors and filters incoming/outgoing traffic','Assigns IP addresses','Provides VPN tunneling'], a: 1,
      exp: 'A firewall monitors and controls network traffic based on predefined security rules to block unauthorized access.' },
    { q: 'What is the purpose of a VPN?',
      opts: ['Block ads','Speed up internet','Encrypt traffic and mask your IP address','Scan for malware'], a: 2,
      exp: 'A VPN creates an encrypted tunnel and hides your real IP, protecting privacy especially on public Wi-Fi.' },
    { q: 'What does IDS stand for in network security?',
      opts: ['Internet Data System','Intrusion Detection System','Internal Defense Shield','IP Distribution Service'], a: 1,
      exp: 'An Intrusion Detection System (IDS) monitors network traffic for suspicious activity and alerts administrators.' },
    { q: 'Which attack floods a server with traffic to make it unavailable?',
      opts: ['Phishing','SQL injection','DDoS','Ransomware'], a: 2,
      exp: 'A Distributed Denial-of-Service (DDoS) attack overwhelms a server with traffic from many sources.' },
    { q: 'What is the Zero Trust security model based on?',
      opts: ['Trust everyone inside the network','Never trust, always verify','Block all external traffic','Use only VPNs'], a: 1,
      exp: 'Zero Trust assumes no user or device is trusted by default — every access request must be verified.' }
  ]
};