        const heading = React.createElement(
            'div',
            {id:'parent'},
            React.createElement(
                'div',
                {id:'child'},
                [
                    React.createElement(
                    'h1',
                    {},
                    'Hello World From React'),
                    React.createElement(
                        'h2',
                        {},
                        'Hello World From React')
                ]
                )
            );
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(heading);