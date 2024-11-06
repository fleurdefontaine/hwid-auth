<div align="center">

# HWID Authentication

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/yourusername/hwid-dashboard)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)](https://nodejs.org)

A HWID Auth with simple routes and messy code.
</div>

## Installation

```bash
git clone https://github.com/fleurdefontaine/hwid-auth.git

cd hwid-auth
npm install

cp .env.example .env
```

## Usage

```bash
npm start
```

## Functionality

1. **HWID Validation via API**
   - The `/api/verify-hwid` endpoint accepts the HWID sent by the client in SHA-256 hash form.
   - The client sends a POST request with the body containing the HWID hash (SHA-256).
   - The backend checks whether the HWID is registered in the database or not.
     - If the HWID is valid (registered), the server responds with JSON `{ "valid": true }`.
     - If the HWID is not registered, the server responds with JSON `{ "valid": false }`.

2. **Login & Dashboard**
   - The application includes a login feature for admins.
   - Once logged in, admins can access the dashboard to:
     - Add new HWIDs to the system.
     - Edit existing HWIDs.
     - View activity logs for each HWID modification (such as adding or deleting HWIDs).
   
3. **Logging**
   - Every time an HWID is added or deleted, the system logs these activities.
   - These logs help the admin monitor and verify actions performed within the system.

4. **Input Validation**
   - The system ensures that the data received (especially the HWID) is in the correct and secure format.
   - This reduces security risks and ensures data integrity.

## Disclaimer

This code is provided as a reference and may not be optimized for production environments. It includes basic functionality but lacks advanced efficiency and scalability considerations. Use it at your discretion and consider it as a foundational example.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

[MIT](LICENSE)

---

<div align="center">
<sub>Built with precision by Muhammad Fathur</sub>
</div>