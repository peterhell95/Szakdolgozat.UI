pipeline {
    agent any
    stages {
        
         stage ('Docker Build') {
            steps {
                sh 'docker build -t peterhell95/angular:jenkins .' 
            }
        }
        
        stage ('Docker Login') {
            steps {
                sh 'docker login -u peterhell95 -p Negro123Negro' 
            }
        }
        
         stage ('Docker Push') {
            steps {
                sh 'docker push peterhell95/angular:jenkins' 
            }
        }
    }
}