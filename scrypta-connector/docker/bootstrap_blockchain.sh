#!/bin/bash

touch /opt/scrypta-idanodejs/.BOOTSTRAPPING
pkill lyrad
cd /opt/data/lyra
wget https://bs.scryptachain.org/latest.zip
pkill lyrad
rm- -rf blocks chainstate database
unzip -o latest.zip
lyrad -datadir=/opt/data/lyra &
rm /opt/scrypta-idanodejs/.BOOTSTRAPPING