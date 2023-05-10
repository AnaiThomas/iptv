# iptv
iptv channels

## m3u file format

The EXTM3U format appeared as an extension of the M3U format (hence the name-extended m3u) widely used to form a playlist with a list of audio recordings. Initially, this format was used in the Winamp media player, but eventually gained high popularity, and it eventually began to support almost all players. Now m3u has become almost a standard for the formation of playlists of media players and media devices that play audio and video content.

A file in the EXTM3U format is a text file with the extension m3u or m3u8.
An example of the contents of the file in the EXTM3U format

#EXTM3U 
#PLAYLIST:Playlist1
#EXTINF:-1 tvg-name="Channel 1" tvg-logo="http://site.domain / channel1_logo.png", Channel 1
#EXTGRP:Group1
http://site.domain/channel1
#EXTINF:-1 tvg-name="Channel 2" tvg-logo="http://site.domain / channel2_logo.png", Channel 2
#EXTGRP:Group1
http://site.domain/channel2
#EXTINF:-1 tvg-name="Channel 3" tvg-logo="http://site.domain / channel3_logo.png", Channel 3
#EXTGRP:Group2
http://site.domain/channel3 -- reports and targets

#EXTM3U is the title of the file, tells the device that it is really a playlist in the EXTM3U format and not some text document of arbitrary content. Also next to it can be a link to the file of the TV program if the playlist is used to watch TV. It looks like this : url-tvg="http://playlistserver/xmltv mmm.xml.gz"

#Playlist1 – the name of the playlist

Next in the list are the tracks themselves, in our case, IPTV channels :
#EXTINF:-1 tvg-name="Channel 1" tvg-logo="http://site.domain / channel1_logo.png", Channel 1

The #EXTINF Directive reports that the playlist will be followed by the track/channel data.
-1-track duration, -1 is set to ignore track/stream duration, but can be set in seconds, for example #EXTINF: 362

tvg-name= "Channel 1" - attribute indicating the channel name, is not a standard, but is supported by many IPTV and media

tvg-logo=http://site.domain / channel1_logo.png is also a non-mandatory and non-official attribute containing a link to the channel logo

Channel 1-the name of the track / channel is a mandatory and standard parameter.

#EXTGRP: Group1-attribute indicating the channel group is also unofficial. The second option is to specify the channel group to the media player – group_id="1" group-title="Group1" attributes. Group_id indicates the channel ID, group-title-the name of the group.

That is, if you specify a group of channels through the attributes, you get such a string :
#EXTINF:-1 group_id="1" group-title="Group1" tvg-name="Channel 1" tvg-logo="http://site.domain / channel1_logo.png", Channel 1
Line with the group channel #EXTGRP may not be.

Next, the next line is the link to the media source itself, such as the IPTV stream or the path to the file name if it is a music track, http://site mmm.domain/channel1 .
Description of the attributes EXTM3U

Different media devices can use a different set of parameters. Below are the most popular.
The attributes of the playlist, are specified in the line after the #EXTM3U

    url-tvg – file reference TV programs 
    cache-cache time
    deinterlace – deinterlace, 0, 1 = Blend, 2 = Mean
    aspect-ratio – aspect ratio None, 4:3, 16:9
    crop – crop image WxH+X+Y (for example, 690x550+15+10)
    refresh – the refresh frequency

 
The channel attributes

    censored-indicates that the channel needs to be protected by parental control, if such is present in the device, can take values 0 and 1
    id - unique identifier of the channel
    tvg-id-the unique identifier of the channel in the program file, if the XMLTV format is used for example
    group_id – the group ID of the channels
    group-title – name of the group of channels
    tvg-shift-indicates the shift of the program schedule, takes the values -1, -2,0,1,2,.. and so on.
    tvg-name – name of the channel in the program file, which is used mainly when using programs in a format JTV
    tvg-logo - link to the channel logo
    audio-track-specifies which audio track to use, for example en or ru
    audio-track-num-specifies which audio track number to use starting from zero, for example 0,1,2 and so on.

Friendly IPTV Player supports most of the parameters described above. With this application you can view IPTV channels specified in the playlist format EXTM3U. In order to start watching you need to install the player in the LG TV AND specify the URL of the playlist with the list of channels. More details about all the settings and the supported attributes EXTM3U you can read the user manual to the player.
