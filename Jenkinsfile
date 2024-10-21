pipeline {
    agent any

    stages {
        // Stage 1: Clone the repository from GitHub using SSH URL

        // Stage 2: Build the React application
        stage('Build React App') {
            steps {
                sh 'npm install'  // Install dependencies
                sh 'npm run build'  // Build the React app
            }
        }

        // Stage 3: Deploy the built app to an NGINX web server
        stage('Deploy to NGINX') {
            steps {
                sshagent(['gitsshkey']) {  // 'ssh-agent' is your Jenkins SSH credential ID
                    sh 'scp -r build/* ubuntu@3.83.14.97:/var/www/calculator_proj/'  // Copy files to your server
                }
            }
        }
    }
}
