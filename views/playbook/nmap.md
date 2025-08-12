# Nmap

[Playbook](pbHome.md)

## Network Scan

`nmap -sn 192.168.0.1-254`

Each section of the IP address can have a range added

## Port scan

`nmap [ip address] -A -oG -T3 -p-`

## Nmap flags

### Scan range

- -p nnnn | specific port number
- -p nnnn - nnnn | specify port range
- -p- | scan all ports

### Version detection

- -A or -sV | Standard Version
- --version-light | faster, less accurate
- --version-all | heavy duty

### Scan speed

-Tn | where n is a number between 1 and 5

- 0 - paranoid
- 1 - sneaky
- 2 - polite
- 3 - normal
- 4 - aggressive
- 5 - insane

### Scan type

- -sT | TCP connect
- -sS | SYN "half-open"
- -sU | UDP

### Scan Output

- -oA | for all types
- -oN | output to text file
- -oG | output to a grepable format
- -oX | output to an xml file

### Service selector

Set by default port

- Port : Service
- 21 : FTP
- 22 : Secure shell
- 80 : HTTP
- 443 : HTTPS
- 445 : [SMB, Server Message Block](samba.md)
- 3389 : RDP, remote desktop protocol
