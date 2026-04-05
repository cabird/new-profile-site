file. Another clone from the same group achieves that and copies the above code exactly, but the sequence of helper method calls are different (e.g., instead of calling get_user_id_from_user_name, it calls get_group_id_from_group_name; instead of calling nautilus_file_can_set_owner, it calls nautilus_file_can_set_group). This file has 4,552 lines of code in that snapshot, of which 2,779 lines were identified as cloned code by Deckard. Also, our linked bug data shows that a total of 58 bugs were fixed during the project lifetime and a total of 798 lines were modified during bug fixing, but not a single bug has any cloned code in them.

In Listing 2, we show another clone from one of the largest clone groups, with 27 members totaling 775 lines of cloned code. All the clones come from different files, so this group spans 27 different files. Interestingly, all these clones share a common API protocol, a clone pattern documented by Kapser and Godfrey (2008).

All of these clones first check whether some option is set, allocate an object, set some properties, and then return that object. The code shown creates a ColorBalance object. Other clones likewise create different types of objects such as HueSaturation, BrightnessContrast, ByColorSelect etc. Our linked bug data indicates that a total of 50 bugs were fixed in all the files containing these clones during project lifetime, of which only 1 bug has trace of cloned code. This buggy cloned code came from some other clone in one of these files, but not from the above mentioned 27 member group.

We also did a case study on 800 randomly picked clone groups, 100 from each of the projects and clone detector settings (liberal and conservative) to assess quality of

```c
Tool* tools_new_color_balance ()
{
    Tool * tool;
    ColorBalance * private;
    if (!color_balance_options)
        color_balance_options = tools_register_no_options
            (COLOR_BALANCE, "Color Balance Options");
    tool = (Tool *) g_malloc (sizeof (Tool));
    private = (ColorBalance *) g_malloc (sizeof (ColorBalance));
    tool->type = COLOR_BALANCE;
    tool->state = INACTIVE;
    tool->scroll_lock = 1; /* Disallow scrolling */
    tool->private = (void *) private;
    tool->auto_snap_to = TRUE;
    tool->button_press_func = color_balance_button_press;
    tool->button_release_func = color_balance_button_release;
    tool->motion_func = color_balance_motion;
    tool->arrow_keys_func = standard_arrow_keys_func;
    tool->cursor_update_func = color_balance_cursor_update;
    tool->control_func = color_balance_control;
    return tool;
}
```

Listing 2 Example Clone in Gimp