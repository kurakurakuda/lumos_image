FROM mysql
EXPOSE 3306
ADD ./config/my.cnf /etc/mysql/conf.d/my.cnf
# MySQL8からdefaultの認証プラグインがcaching_sha2_passwordに変わった。
# MySQL5.7までのdefault認証プラグイン mysql_native_password に変える
CMD ["mysqld", "--default-authentication-plugin=mysql_native_password", "--character-set-server=utf8", "--collation-server=utf8_unicode_ci", "--default-time-zone=Asia/Tokyo"]