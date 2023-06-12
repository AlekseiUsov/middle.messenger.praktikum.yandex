import Handlebars from 'handlebars';
import { PluginOption } from 'vite'

export function handlebars(): PluginOption {
    const fileRegEx = /\.hbs$|\.handlebars$/;

    return {
        name: 'vite-plugins-handlebars-precompoile',
        transform(src: string, id: string) {
            if (!fileRegEx.test(id)) {
                return;
            }

            const code = `
            import Handlebars from 'handlebars/runtime';
            export default Handlebars.template(${Handlebars.precompile(src)})
            `
            return { code };
        }
    }

}