# Samba

[Playbook](pbHome.md)

## Enumeration

### Samba - Linux

`enum4linux [options] [ip address]`

Options

- -U : get user list
- -M : get machine list
- -N : get namelist dump
- -S : get sharelist
- -P : get group and member list
- -a : run all of the above

### Common misconfigurations

Default admin password: ??????

## Exploitation

Check for version of service and search for CVE on Exploit-db

### Login

`smbclient //[IP address]/[share drive] -U [username] -p [port]`
