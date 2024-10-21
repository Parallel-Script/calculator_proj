pipeline {
    agent any  // This means Jenkins can run the job on any available agent

    stages {
        // Stage 1: Clone the repository from GitHub
        stage('Clone Repository') {
            steps {
                git 'https://github.com/username/repository-name.git'
            }
        }

        // Stage 2: Build the React application
        stage('Build React App') {
            steps {
                sh 'npm install'  // Installs the dependencies listed in package.json
                sh 'npm run build'  // Builds the React app, generating a build folder
            }
        }

        // Stage 3: Deploy the built app to an NGINX web server
        stage('Deploy to NGINX') {
            steps {
                sshagent(['your-ssh-credential-id']) {  // Use your server's SSH credentials stored in Jenkins
                    sh 'scp -r build/* user@server_ip:/var/www/react-app/'  // Securely copy the files to the server
                }
            }
        }
    }
}
