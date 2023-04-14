<?php

/**
 * Base Route
 * @author Firstname Lastname
 * @version 1.0
 * */
class Route
{

    function handleRoute($url)
    {
        global $routes;
        unset($routes['default_controller']);

        $url = trim($url, '/');

        if (empty($url)) $url = '/';

        $handleUrl = $url;
        if (!empty($routes)) {
            foreach ($routes as $key => $value) {
                if (preg_match('~' . $key . '~is', $url)) {
                    $handleUrl = preg_replace('~' . $key . '~is', $value, $url);
                }
                // echo $handleUrl;
                // $handleUrl = str_replace($key, $value, $handleUrl);
            }
        }
        return $handleUrl;
    }
}
