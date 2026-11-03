### Installation

1. Clone the repository and navigate to the project's directory:

   ```bash
   git clone https://github.com/itsactuallyosef/FusionGuard/ && cd FusionGuard
   ```

2. Install and switch to the project's required Node.js version:

   ```bash
   nvm install
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create your environment file and fill in the values (e.g. the Wazuh indexer URL and credentials):

   ```bash
   cp .env.example .env
   ```

5. Run the project:

   ```bash
   npm run dev
   ```
