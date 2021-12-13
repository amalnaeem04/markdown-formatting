## The epic

Design a service that given a string with line breaks ("\n") and formatting parameters, returns a string formatted with basic markdown syntax.

Example input:

```
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sit amet lacus eu purus malesuada sodales. Nunc a risus nunc.\nPraesent eget volutpat eros. Fusce mollis gravida nunc, vitae accumsan ligula varius vitae. Duis in tellus non est pulvinar efficitur quis ac tortor. Aliquam dictum, magna quis venenatis pharetra, leo sapien mollis mauris, et vestibulum arcu est eget turpis. Etiam tortor erat, lacinia et faucibus vitae, maximus et elit.\nDonec nisl nisi, imperdiet vitae felis ut, maximus condimentum ante. Curabitur efficitur sem sed ligula eleifend varius. Mauris et risus quis libero mattis auctor id ut orci.\nAliquam cursus sapien et euismod vestibulum. In maximus dolor eu vulputate tempus. Aenean ultricies nisl id elit mattis, vitae finibus libero interdum. Vestibulum ornare quam nec ornare fermentum.
```

The service should be able to:

- Limit text to a specified line width.
- Given a list of words, turn them bold using markdown syntax. (ie. all **Aliquam** words in text should be made bold)
- Given a list of words and their substitutions, replace all occurrences of the specified words with their substitutions. (ie. replace every Duis with DUIS and so on)
- Given a list of words, add a random Chuck Norris fact after the paragraph where such words are found. (possible source https://api.chucknorris.io/)

### A test case

Given the parameters:

```
- Line width: 80
- Bold strings: "Aliquam", "Mauris"
- Replace strings: ("cursus", "CURSUS"), ("lacinia", "malesuada nunc")
- Chuck Norris food fact strings: "tortor", "fames"
```

And the input text:

```
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sit amet lacus eu purus malesuada sodales. Nunc a risus nunc.\nPraesent eget volutpat eros. Fusce mollis gravida nunc, vitae accumsan ligula varius vitae. Duis in tellus non est pulvinar efficitur quis ac tortor. Aliquam dictum, magna quis venenatis pharetra, leo sapien mollis mauris, et vestibulum arcu est eget turpis. Etiam tortor erat, lacinia et faucibus vitae, maximus et elit.\nDonec nisl nisi, imperdiet vitae felis ut, maximus condimentum ante. Curabitur efficitur sem sed ligula eleifend varius. Mauris et risus quis libero mattis auctor id ut orci.\nAliquam cursus sapien et euismod vestibulum. In maximus dolor eu vulputate tempus. Aenean ultricies nisl id elit mattis, vitae finibus libero interdum. Vestibulum ornare quam nec ornare fermentum.
```

One possible output could be:

```
 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sit amet lacus eu\npurus malesuada sodales. Nunc a risus nunc.                                     \nPraesent eget volutpat eros. Fusce mollis gravida nunc, vitae accumsan ligula   \nvarius vitae. Duis in tellus non est pulvinar efficitur quis ac tortor.         \n**Aliquam** dictum, magna quis venenatis pharetra, leo sapien mollis mauris, et \nvestibulum arcu est eget turpis. Etiam tortor erat, malesuada nunc et faucibus  \nvitae, maximus et elit.                                                         \nThere is space, there is time, and there is Chuck Norris. Just kidding, Chuck   \ncame first.                                                                     \nDonec nisl nisi, imperdiet vitae felis ut, maximus condimentum ante. Curabitur  \nefficitur sem sed ligula eleifend varius. **Mauris** et risus quis libero mattis\nauctor id ut orci.                                                              \n**Aliquam** CURSUS sapien et euismod vestibulum. In maximus dolor eu vulputate  \ntempus. Aenean ultricies nisl id elit mattis, vitae finibus libero interdum.    \nVestibulum ornare quam nec ornare fermentum.
```

Or what's the same but replacing the "\n" with actual line breaks for better readability in this Readme:

```
 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sit amet lacus eu
 purus malesuada sodales. Nunc a risus nunc.                                     
 Praesent eget volutpat eros. Fusce mollis gravida nunc, vitae accumsan ligula   
 varius vitae. Duis in tellus non est pulvinar efficitur quis ac tortor.         
 **Aliquam** dictum, magna quis venenatis pharetra, leo sapien mollis mauris, et 
 vestibulum arcu est eget turpis. Etiam tortor erat, malesuada nunc et faucibus  
 vitae, maximus et elit.                                                         
 There is space, there is time, and there is Chuck Norris. Just kidding, Chuck   
 came first.                                                                     
 Donec nisl nisi, imperdiet vitae felis ut, maximus condimentum ante. Curabitur  
 efficitur sem sed ligula eleifend varius. **Mauris** et risus quis libero mattis
 auctor id ut orci.                                                              
 **Aliquam** CURSUS sapien et euismod vestibulum. In maximus dolor eu vulputate  
 tempus. Aenean ultricies nisl id elit mattis, vitae finibus libero interdum.    
 Vestibulum ornare quam nec ornare fermentum.                                    
```
