pipeline {
    agent any
    stages {
        
        stage ('Docker Build') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker', passwordVariable: 'pass', usernameVariable: 'user')]) {
                    bat 'docker login -u $user -p $pass$' 
                    echo "$user$"
                }
            }
        }
        
        stage ('Docker Login') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker', passwordVariable: 'pass', usernameVariable: 'user')]) { 
                    bat ''' docker login -u $user$ -p $pass$
                    '''
                }
            }
        }
        
         stage ('Docker Push') {
            steps {
                bat 'docker push peterhell95/angular:jenkins' 
            }
        }

        stage('Apply Kubernetes files') {
            steps{
        	withKubeConfig([credentialsId: 'my_kubernetes2',  serverUrl: 'https://192.168.63.188:8443']) {
      			bat 'kubectl apply -f angular-deployment.yaml'
   				}
  			}
        }
    }
}