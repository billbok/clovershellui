<template>
  <v-app id="inspire">
    <v-navigation-drawer
    persistent
    clipped
    app
    v-model="drawer"
    >
    <v-list dense>
      <template v-for="(item, i) in items">
        <v-layout
        row
        v-if="item.heading"
        align-center
        :key="i"
        >
        <v-flex xs6>
          <v-subheader v-if="item.heading">
            {{ item.heading }}
          </v-subheader>
        </v-flex>
        <v-flex xs6 class="text-xs-center">
          <a href="#!" class="body-2 black--text">EDIT</a>
        </v-flex>
      </v-layout>
      <v-list-group v-else-if="item.children" v-model="item.model" no-action>
        <v-list-tile slot="item" @click="">
          <v-list-tile-action>
            <v-icon>{{ item.model ? item.icon : item['icon-alt'] }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.text }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
        v-for="(child, i) in item.children"
        :key="i"
        @click=""
        >
        <v-list-tile-action v-if="child.icon">
          <v-icon>{{ child.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>
            {{ child.text }}
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list-group>
    <v-list-tile v-else @click="">
      <v-list-tile-action>
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>
          {{ item.text }}
        </v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </template>
</v-list>
</v-navigation-drawer>
<v-toolbar class="blue darken-2"dark app clipped-left fixed>
  <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
    <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    <a href="http://192.168.0.48:8080" style="color:white;text-decoration:none">Clovershell</a>
  </v-toolbar-title>
<!--   <v-text-field
  solo
  prepend-icon="search"
  v-model="recherche" 
  placeholder="Search"
  @keyup.enter="alert = !alert"
  ></v-text-field> -->
  <v-spacer></v-spacer>
  <v-btn icon>
    <v-icon >apps</v-icon>
  </v-btn>
  <v-btn icon>
    <v-icon>notifications</v-icon>
  </v-btn>
  <v-btn icon large>
    <v-avatar size="32px" tile>
      <img
      src="https://vuetifyjs.com/static/doc-images/logo.svg"
      alt="Vuetify"
      >
    </v-avatar>
  </v-btn>
</v-toolbar>
<main>
  <v-content>
    <v-container grid-list-xl text-xs-center>
      <v-layout row wrap text-xs-left>

        <v-flex xs8 offset-xs2>
          <v-text-field
          name="input-1"
          append-icon="search"
          label="Search a command..."
          v-model="recherche"
          clearable
          prefix="$"
          @keyup.enter="alert = !alert"
          id="testing"
          ></v-text-field>

          <v-flex xs8 offset-xs2>
            <v-alert color="info" icon="info" dismissible v-model="alert"  transition="scale-transition">
              Votre recherche: {{ recherche }}
            </v-alert>
          </v-flex>
        </v-flex>
      </v-layout>
      <v-layout row wrap text-xs-center>
        <v-flex xs8 offset-xs2>
          <v-expansion-panel popout class="pa-0">
            <v-expansion-panel-content v-for="clover in clovers" class="pa-0">
              <div slot="header">
                    <v-layout row class="pa-0">
                    <v-flex xs10 order-md1 order-xs1 class="pa-0">
                      <v-card flat class="pa-0">
                          <v-card-text> {{ clover.description }}</v-card-text>
                      </v-card>
                    </v-flex>
                    <v-flex xs1 order-md2 order-xs2 class="pa-0">
                      <v-card flat class="pa-0">
                          <v-card-text>Date</v-card-text>
                      </v-card>
                    </v-flex>
                    <v-flex xs1 order-md3 order-xs3 class="pa-0">
                      <v-card flat class="pa-0">
                        <v-card-text>Note</v-card-text>
                      </v-card>
                    </v-flex>
                  </v-layout>
              </div>
              <v-card>
                <v-card-actions class="grey lighten-3">
                  <v-spacer class="shell-body"><li>{{ clover.command }}</li></v-spacer>

                  <v-tooltip top>
                    <v-btn icon v-clipboard:copy="clover.command" v-clipboard:success="onCopy" v-clipboard:error="onError" slot="activator"><v-icon >content_copy</v-icon></v-btn>
                    <span>Copy to clipboard</span>
                  </v-tooltip>

                  <v-tooltip top>
                    <v-btn icon slot="activator" class="blue--text text--lighten-2" @click="thumb_up_m"><v-icon>thumb_up</v-icon></v-btn>
                    <span>OK</span>
                  </v-tooltip>

                  <v-tooltip top>
                    <v-btn icon slot="activator" class="red--text text--lighten-2"  @click="thumb_down_m"><v-icon>thumb_down</v-icon></v-btn>
                    <span>KO</span>
                  </v-tooltip>

                </v-card-actions>
              </v-card-text>

            </v-card>

          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
    </v-layout>
  </v-container>
</v-content>
</main>
<v-snackbar
:timeout="timeout"
:color="color"
:multi-line="mode === 'multi-line'"
:vertical="mode === 'vertical'"
v-model="snackbar"
>
{{ text }}
<v-btn dark flat @click.native="snackbar = false">Close</v-btn>
</v-snackbar>

<v-btn
fab
bottom
right
color="red"
dark
fixed
@click.stop="dialog = !dialog"
>
<v-icon>add</v-icon>
</v-btn>
<v-dialog v-model="dialog" width="800px">
  <v-card>
    <v-card-title
    class="grey lighten-4 py-4 title"
    >
    Add command
  </v-card-title>
  <v-container grid-list-sm class="pa-4">
    <v-layout row wrap>
      <v-flex xs12 align-center justify-space-between>
        <v-layout align-center>
          <v-avatar size="40px" class="mr-3">
            <img
            src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png"
            alt=""
            >
          </v-avatar>
          <v-text-field
          placeholder="Name of the comand"
          ></v-text-field>
        </v-layout>
      </v-flex>
      <v-flex xs6>
        <v-text-field
        prepend-icon="business"
        placeholder="Company"
        ></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field
        placeholder="Job title"
        ></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-text-field
        prepend-icon="mail"
        placeholder="Email"
        ></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-text-field
        type="tel"
        prepend-icon="phone"
        placeholder="(000) 000 - 0000"
        mask="phone"
        ></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-text-field
        prepend-icon="notes"
        placeholder="Notes"
        ></v-text-field>
      </v-flex>
    </v-layout>
  </v-container>
  <v-card-actions>
    <v-btn flat color="primary">More</v-btn>
    <v-spacer></v-spacer>
    <v-btn flat color="primary" @click="dialog = false">Cancel</v-btn>
    <v-btn flat @click="dialog = false">Save</v-btn>
  </v-card-actions>
</v-card>
</v-dialog>
</v-app>
</template>

<script>
export default {
  data: () => ({
    clovers: [
    {
      "description": "Send a mail",
      "name": "send_mail",
      "command": "echo \"Body goes here\" | mutt -s \"A subject\" -a /path/to/file.tar.gz recipient@example.com",
      "score": 0
    },
    {
      "description": "Create a ubuntu container",
      "name": "docker_ubuntu",
      "command": "docker run -dit --name ubuntu ubuntu",
      "score": 0
    },
    {
      "description": "Send a mail",
      "name": "send_mail",
      "command": "echo \"Body goes here\" | mutt -s \"A subject\" -a /path/to/file.tar.gz recipient@example.com",
      "score": 0
    },
    {
      "description": "Send a mail",
      "name": "send_mail",
      "command": "echo \"Body goes here\" | mutt -s \"A subject\" -a /path/to/file.tar.gz recipient@example.com",
      "score": 0
    },
    {
      "description": "Send a mail",
      "name": "send_mail",
      "command": "echo \"Body goes here\" | mutt -s \"A subject\" -a /path/to/file.tar.gz recipient@example.com",
      "score": 0
    },
    {
      "description": "Send a mail",
      "name": "send_mail",
      "command": "echo \"Body goes here\" | mutt -s \"A subject\" -a /path/to/file.tar.gz recipient@example.com",
      "score": 0
    },
    ],
    recherche: '',
    message_snack: '',
    alert: false,
    isActive: false,
    dialog: false,
    snackbar: false,
    color: 'green',
    mode: '',
    timeout: 2000,
    text: '',
    drawer: false,
    items: [
    { icon: 'contacts', text: 'Contacts' },
    { icon: 'history', text: 'Frequently contacted' },
    { icon: 'content_copy', text: 'Duplicates' },
    {
      icon: 'keyboard_arrow_up',
      'icon-alt': 'keyboard_arrow_down',
      text: 'Labels',
      model: true,
      children: [
      { icon: 'add', text: 'Create label' }
      ]
    },
    {
      icon: 'keyboard_arrow_up',
      'icon-alt': 'keyboard_arrow_down',
      text: 'More',
      model: false,
      children: [
      { text: 'Import' },
      { text: 'Export' },
      { text: 'Print' },
      { text: 'Undo changes' },
      { text: 'Other contacts' }
      ]
    },
    { icon: 'settings', text: 'Settings' },
    { icon: 'chat_bubble', text: 'Send feedback' },
    { icon: 'help', text: 'Help' },
    { icon: 'phonelink', text: 'App downloads' },
    { icon: 'keyboard', text: 'Go to the old version' }
    ]
  }),
  props: {
    source: String
  },
  methods: {
    onCopy: function (e) {
      this.snackbar=true
      this.text="Command successfully copied in your clipboard"
    },
    onError: function (e) {
      this.snackbar=true
      this.text="Command unsuccessfully copied in your clipboard"
      this.color=red
    },
    close: function () {
      this.snackbar=false
    },
    thumb_up_m: function () {
      this.snackbar=true
      this.text="Thumbs up +1"
      this.color="blue"
    },
    thumb_down_m: function () {
      this.snackbar=true
      this.text="Thumbs up -1"
      this.color="red"
    },
  }
}
</script>

<style type="text/css">
.shell-body {
  margin: 0;
  padding: 5px;
  list-style: none;
  background: #444444;
  color: #eeeeee;
  font: 0.8em 'Andale Mono', Consolas, 'Courier New';
  line-height: 1.6em;

  -webkit-border-bottom-right-radius: 1px;
  -webkit-border-bottom-left-radius: 1px;
  -moz-border-radius-bottomright: 1px;
  -moz-border-radius-bottomleft: 1px;
  border-bottom-right-radius: 1px;
  border-bottom-left-radius: 1px;
}

.shell-body li:before {
  content: '$';
  position: absolute;
  left: 0;
  top: 0;
}

.shell-body li {
  word-wrap: break-word;
  position: relative;
  padding: 0 0 0 15px;
}
</style>