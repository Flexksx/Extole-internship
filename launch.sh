cd back/
sudo setenforce 0
sudo systemctl restart nginx
sudo nginx -t
sudo pktriot start
