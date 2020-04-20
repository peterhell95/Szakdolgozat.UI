pipeline {
    agent any
    stages {
        
        stage ('Docker Build') {
            steps {
                bat 'docker build -t peterhell95/angular:jenkins .' 
            }
        }
        
        stage ('Docker Login') {
            steps {
                bat 'docker login -u peterhell95 -p Negro123Negro' 
            }
        }
        
         stage ('Docker Push') {
            steps {
                bat 'docker push peterhell95/angular:jenkins' 
            }
        }

        stage('Apply Kubernetes files') {
            steps{
        	withKubeConfig([credentialsId: 'my_kubernetes2',  serverUrl: 'https://192.168.82.251:8443']) {
      			bat 'kubectl apply -f angular-deployment.yaml'
   				}
  			}
        }
    }
}