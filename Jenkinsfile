pipeline {
    agent any

    environment {
        // Define environment variables if needed (e.g., SSH credentials, project directory)
        REACT_BUILD_DIR = 'build'
        NGINX_DEPLOY_DIR = '/var/www/calculator_proj'
        SSH_CREDENTIALS_ID = 'gitsshkey'  // SSH credentials configured in Jenkins
        SERVER_IP = '3.83.14.97'              // Update with your server IP
        USER = 'ubuntu'                          // User to SSH into the server
    }

    stages {

        stage('Git Checkout') {
            steps {
                git branch: 'main', url: 'git@github.com:Parallel-Script/calculator_proj.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build React Project') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Prepare Nginx Server') {
            steps {
                script {
                    // Ensure Nginx is installed and running
                    sshagent(['gitsshkey']) {
                        sh """
                        ssh ${USER}@${SERVER_IP} '
                            sudo apt update &&
                            sudo apt install nginx -y &&
                            sudo systemctl enable nginx &&
                            sudo systemctl start nginx
                        '
                        """
                    }
                }
            }
        }

        stage('Deploy to Nginx') {
            steps {
                script {
                    sshagent(['gitsshkey']) {
                        // Remove old files from Nginx root directory
                        sh """
                        ssh ${USER}@${SERVER_IP} 'sudo rm -rf ${NGINX_DEPLOY_DIR}/*'
                        """
                        
                        // Copy new build files to the Nginx directory
                        sh """
                        scp -r ${REACT_BUILD_DIR}/* ${USER}@${SERVER_IP}:${NGINX_DEPLOY_DIR}/
                        """
                    }
                }
            }
        }

        stage('Restart Nginx') {
            steps {
                script {
                    sshagent(['gitsshkey']) {
                        sh """
                        ssh ${USER}@${SERVER_IP} '
                            sudo systemctl restart nginx
                        '
                        """
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished.'
        }
        success {
            echo 'React project successfully deployed to Nginx.'
        }
        failure {
            echo 'Deployment failed.'
        }
    }
}
