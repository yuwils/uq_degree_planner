cd /home/ec2-user/uq_degree_planner/
aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws
docker pull public.ecr.aws/r8i2f5k8/uq_degree_planner:latest
docker run -d --name uq_degree_planner --env-file .env --net=host public.ecr.aws/r8i2f5k8/uq_degree_planner:latest